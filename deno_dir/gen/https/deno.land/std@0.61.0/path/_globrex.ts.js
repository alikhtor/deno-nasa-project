import { isWindows as isWin } from "./_constants.ts";
const SEP = isWin ? `(?:\\\\|\\/)` : `\\/`;
const SEP_ESC = isWin ? `\\\\` : `/`;
const SEP_RAW = isWin ? `\\` : `/`;
const GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
const WILDCARD = `(?:[^${SEP_ESC}/]*)`;
const GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
const WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
export function globrex(glob, { extended = false, globstar = false, strict = false, filepath = false, flags = "", } = {}) {
    const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
    let regex = "";
    let segment = "";
    let pathRegexStr = "";
    const pathSegments = [];
    let inGroup = false;
    let inRange = false;
    const ext = [];
    function add(str, options = { split: false, last: false, only: "" }) {
        const { split, last, only } = options;
        if (only !== "path")
            regex += str;
        if (filepath && only !== "regex") {
            pathRegexStr += str.match(sepPattern) ? SEP : str;
            if (split) {
                if (last)
                    segment += str;
                if (segment !== "") {
                    if (!flags.includes("g"))
                        segment = `^${segment}$`;
                    pathSegments.push(new RegExp(segment, flags));
                }
                segment = "";
            }
            else {
                segment += str;
            }
        }
    }
    let c, n;
    for (let i = 0; i < glob.length; i++) {
        c = glob[i];
        n = glob[i + 1];
        if (["\\", "$", "^", ".", "="].includes(c)) {
            add(`\\${c}`);
            continue;
        }
        if (c.match(sepPattern)) {
            add(SEP, { split: true });
            if (n != null && n.match(sepPattern) && !strict)
                regex += "?";
            continue;
        }
        if (c === "(") {
            if (ext.length) {
                add(`${c}?:`);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === ")") {
            if (ext.length) {
                add(c);
                const type = ext.pop();
                if (type === "@") {
                    add("{1}");
                }
                else if (type === "!") {
                    add(WILDCARD);
                }
                else {
                    add(type);
                }
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "|") {
            if (ext.length) {
                add(c);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "+") {
            if (n === "(" && extended) {
                ext.push(c);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "@" && extended) {
            if (n === "(") {
                ext.push(c);
                continue;
            }
        }
        if (c === "!") {
            if (extended) {
                if (inRange) {
                    add("^");
                    continue;
                }
                if (n === "(") {
                    ext.push(c);
                    add("(?!");
                    i++;
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "?") {
            if (extended) {
                if (n === "(") {
                    ext.push(c);
                }
                else {
                    add(".");
                }
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "[") {
            if (inRange && n === ":") {
                i++;
                let value = "";
                while (glob[++i] !== ":")
                    value += glob[i];
                if (value === "alnum")
                    add("(?:\\w|\\d)");
                else if (value === "space")
                    add("\\s");
                else if (value === "digit")
                    add("\\d");
                i++;
                continue;
            }
            if (extended) {
                inRange = true;
                add(c);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "]") {
            if (extended) {
                inRange = false;
                add(c);
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "{") {
            if (extended) {
                inGroup = true;
                add("(?:");
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "}") {
            if (extended) {
                inGroup = false;
                add(")");
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === ",") {
            if (inGroup) {
                add("|");
                continue;
            }
            add(`\\${c}`);
            continue;
        }
        if (c === "*") {
            if (n === "(" && extended) {
                ext.push(c);
                continue;
            }
            const prevChar = glob[i - 1];
            let starCount = 1;
            while (glob[i + 1] === "*") {
                starCount++;
                i++;
            }
            const nextChar = glob[i + 1];
            if (!globstar) {
                add(".*");
            }
            else {
                const isGlobstar = starCount > 1 &&
                    [SEP_RAW, "/", undefined].includes(prevChar) &&
                    [SEP_RAW, "/", undefined].includes(nextChar);
                if (isGlobstar) {
                    add(GLOBSTAR, { only: "regex" });
                    add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                    i++;
                }
                else {
                    add(WILDCARD, { only: "regex" });
                    add(WILDCARD_SEGMENT, { only: "path" });
                }
            }
            continue;
        }
        add(c);
    }
    if (!flags.includes("g")) {
        regex = `^${regex}$`;
        segment = `^${segment}$`;
        if (filepath)
            pathRegexStr = `^${pathRegexStr}$`;
    }
    const result = { regex: new RegExp(regex, flags) };
    if (filepath) {
        pathSegments.push(new RegExp(segment, flags));
        result.path = {
            regex: new RegExp(pathRegexStr, flags),
            segments: pathSegments,
            globstar: new RegExp(!flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT, flags),
        };
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2dsb2JyZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfZ2xvYnJleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsU0FBUyxJQUFJLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDM0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNyQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ25DLE1BQU0sUUFBUSxHQUFHLFdBQVcsT0FBTyxTQUFTLE9BQU8sV0FBVyxDQUFDO0FBQy9ELE1BQU0sUUFBUSxHQUFHLFFBQVEsT0FBTyxNQUFNLENBQUM7QUFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLE9BQU8sU0FBUyxPQUFPLFdBQVcsQ0FBQztBQUNyRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsT0FBTyxNQUFNLENBQUM7QUFzQy9DLE1BQU0sVUFBVSxPQUFPLENBQ3JCLElBQVksRUFDWixFQUNFLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLE1BQU0sR0FBRyxLQUFLLEVBQ2QsUUFBUSxHQUFHLEtBQUssRUFDaEIsS0FBSyxHQUFHLEVBQUUsTUFDUSxFQUFFO0lBRXRCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzlELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFlBQVksR0FBRyxFQUFF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