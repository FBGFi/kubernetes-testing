#!bin/bash
if [ ! -z "$1" ]; then
    SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    TARGET_DIR="$SCRIPT_DIR/src/components/$1"
    if [ ! -d "$SCRIPT_DIR/src/components" ]; then
        mkdir "$SCRIPT_DIR/src/components"
    fi
    if [ -d $TARGET_DIR ]; then
        echo "Component $1 already exists."
    else
        mkdir "$SCRIPT_DIR/src/components/$1"
        echo -e ".$1{\n\t\n}" > "$TARGET_DIR/$1.css"
        echo -e "import React from 'react';\nimport { render } from '@testing-library/react';\nimport $1 from './index';\n\ntest('Basic component rendering', () => {\n\tconst { container } = render(<$1 />);\n\texpect(container.firstChild).toHaveClass('$1');\n});" > "$TARGET_DIR/$1.test.tsx"
        echo -e "import React from 'react';\nimport './$1.css';\n\ntype T$1Props = {\n\t\n}\n\nconst $1: React.FC<T$1Props> = (props) => {\n\treturn (\n\t\t<div className='$1'>\n\t\t\t\n\t\t</div>\n\t);\n}\n\nexport type { T$1Props };\nexport {  };\nexport default $1;" > "$TARGET_DIR/index.tsx"
        echo "Component $1 created."
    fi
else
    echo "Give an argument for the component name."
fi