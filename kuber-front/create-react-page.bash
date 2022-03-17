#!bin/bash
if [ ! -z "$1" ]; then
    SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    TARGET_DIR="$SCRIPT_DIR/src/pages/$1"
    if [ ! -d "$SCRIPT_DIR/src/pages" ]; then
        mkdir "$SCRIPT_DIR/src/pages"
        mkdir "$SCRIPT_DIR/src/pages/Page"
        echo -e ".Page{\n\t\n}" > "$SCRIPT_DIR/src/pages/Page/Page.css"
        echo -e "import React from 'react';\nimport { render } from '@testing-library/react';\nimport Page from './index';\n\ntest('Page template rendering', () => {\n\tconst { container } = render(<Page className='Test' />);\n\texpect(container.firstChild).toHaveClass('Page Test');\n});" > "$SCRIPT_DIR/src/pages/Page/Page.test.tsx"
        echo -e "import React from 'react';\nimport './Page.css';\n\ntype TPageProps = {\n\tclassName: string\n}\n\nconst Page: React.FC<TPageProps> = (props) => {\n\treturn (\n\t\t<div className={'Page ' + props.className}>\n\t\t\t{props.children}\n\t\t</div>\n\t);\n}\n\nexport type { TPageProps };\nexport {  };\nexport default Page;" > "$SCRIPT_DIR/src/pages/Page/index.tsx"
        
    fi

    E2E_DIR="$SCRIPT_DIR/cypress/integration"
    if [ ! -d "$E2E_DIR" ]; then
        echo "Cypress not configured"
    elif [ ! -d "$E2E_DIR/pages" ]; then
        mkdir "$E2E_DIR/pages"
    fi

    if [ ! -f "$E2E_DIR/pages/$1.spec.js" ]; then
        echo -e "/// <reference types='cypress' />\n\ndescribe('$1 testing', () => {\n\tbeforeEach(() => {\n\t\tcy.visit('http://localhost:3000/$2');\n\t});\n\tit('should render $1', () => {\n\t\tcy.get('.$1').should('exist');\n\t})\n});" > "$E2E_DIR/pages/$1.spec.js"
    fi

    if [ -d $TARGET_DIR ]; then
        echo "Page $1 already exists."
    else
        mkdir "$SCRIPT_DIR/src/pages/$1"
        echo -e ".$1{\n\t\n}" > "$TARGET_DIR/$1.css"
        echo -e "import React from 'react';\nimport { render } from '@testing-library/react';\nimport $1 from './index';\n\ntest('$1 rendering', () => {\n\tconst { container } = render(<$1 />);\n\texpect(container.firstChild).toHaveClass('Page $1');\n});" > "$TARGET_DIR/$1.test.tsx"
        echo -e "import React from 'react';\nimport './$1.css';\nimport Page from 'pages/Page';\n\ntype T$1Props = {\n\t\n}\n\nconst $1: React.FC<T$1Props> = (props) => {\n\treturn (\n\t\t<Page className='$1'>\n\t\t\t\n\t\t</Page>\n\t);\n}\n\nexport type { T$1Props };\nexport {  };\nexport default $1;" > "$TARGET_DIR/index.tsx"
        echo "Component $1 created."
    fi
else
    echo "Give an argument for the component name and route."
fi