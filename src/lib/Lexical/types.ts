type GENERAL =
    | "ACL"
    | "ANY"
    | "LOCALHOST"
    | "LOCALNETS"
    | "NONE"
    | "OPTIONS"
    | "INCLUDE"
    | "ALLOW_QUERY"
    | "ALLOW_RECURSION"
    | "BLACKHOLE"
    | "DIRECTORY"
    | "FORWARD"
    | "FIRST"
    | "ONLY"
    | "FORWARDERS"
    | "LISTEN_ON"
    | "NOTIFY"
    | "YES"
    | "NO"
    | "EXPLICIT"
    | "PID_FILE"
    | "ROOT_DELEGATION_ONLY"
    | "STATISTICS_FILE"
    | "FIRST"
    | "ZONE"
    | "ALLOW_TRANSFER"
    | "ALLOW_UPDATE"
    | "FILE"
    | "MASTERS"
    | "TYPE"
    | "DELEGATION_ONLY"
    | "HINT"
    | "MASTER"
    | "SLAVE"
    | "ZONE_STATISTICS";

type SIGN = "OPEN_BRACKET" | "CLOSE_BRACKET" | "SEMICOLON" | "DOUBLE_QUOTATION";

type CUSTOM = "ABSOLUTE_PATH" | "IP" | "IP_RANGE" | "ID";

type ALL = GENERAL | SIGN | CUSTOM;

export default ALL;
