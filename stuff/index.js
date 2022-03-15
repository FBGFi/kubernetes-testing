// try some indexing
const baseKeyArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'unknown'];
const indexedObject = {};

for(let key1 of baseKeyArray){
    indexedObject[key1] = {};
    for(let key2 of baseKeyArray){
        indexedObject[key1][key2] = {};
        for(let key3 of baseKeyArray){
            indexedObject[key1][key2][key3] = []
        }
    }
}

// no, just no
function addToIndexedObject(value){
    let chars = value.split("");
    if(!chars[1] || !indexedObject[chars[1]]){
        if(!chars[2] || !indexedObject.unknown[chars[2]]){
            if(!chars[3] || !indexedObject.unknown.unknown[chars[3]]){
                indexedObject.unknown.unknown.unknown = value;
            } else {
                indexedObject.unknown.unknown.unknown = value;
            }
        } else {
            
        }
    } else {

    }
}

function seekFromIndexedObject(value){

}

addToIndexedObject("testi")