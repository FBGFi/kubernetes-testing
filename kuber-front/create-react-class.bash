#!bin/bash
if [ ! -z "$1" ]; then
    SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    TARGET_DIR="$SCRIPT_DIR/src/constants/classes/$1"
    if [ ! -d "$SCRIPT_DIR/src/constants" ]; then
        mkdir "$SCRIPT_DIR/src/constants"
        if [ ! -d "$SCRIPT_DIR/src/constants/classes" ]; then
            mkdir "$SCRIPT_DIR/src/constants/classes"
        fi
    fi
    if [ -d $TARGET_DIR ]; then
        echo "Class $1 already exists."
    else
        mkdir "$TARGET_DIR"
        echo -e "import I$1 from './I$1';\n\nexport default class $1 implements I$1{\n\tconstructor(){\n\t\t\n\t}\n}" > "$TARGET_DIR/index.ts"
        echo -e "export default interface I$1{\n\t\n}" > "$TARGET_DIR/I$1.ts"
        echo "Class $1 created."
    fi
else
    echo "Give an argument for the class name."
fi