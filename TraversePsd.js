
//  Covert  PSD to XML   
// Position: relative to its parent container(group)
// Order: relative to its parent container in hierarchy
// Content Size : the bound box of then layer  

// Zenghang Hsu,2020

#include "./LayerDefinition.js"

function parseLayer(layer,file)
{   
    //TextItem 
    if( layer.kind == LayerKind.TEXT) {   
        file.write(Text(layer,file));
    }
    //Shape
    else if(layer.kind == LayerKind.SOLIDFILL){
        file.write(Shape(layer,file));
    }
    //Normal Layer 
    else{   
        file.write(NormalLayer(layer,file));
    }

}

function traverse(layer,file)
{
    var layerType = layer.typename;

    //visit layers in this group recursively
    if (layerType == "LayerSet")
    {   
        var indent = repeatString(INDENT,layer._Depth );
        var indentProperty = indent + INDENT_PROPERTT;

        file.write( indent + formatType("LayerSet",layer.name) +"\n");
        file.write( indentProperty + formatPosition(layer) +"\n");
        file.write( indentProperty + formatProprety("Zorder",layer._Zorder) +"\n");

        var layers = layer.layers;
        for (var i = 0; i< layers.length ;++i )
        {      
            layers[i]._Zorder = layers.length - i; 
            layers[i]._Depth = layer._Depth + 1;
            traverse(layer.layers[i],file);
        }
        file.write(indent + "</Window>" +"\n");

    }else{   
        parseLayer(layer,file);
    }
}

// traverse active document  
function traverseDocoment(file)
{   
    if(!app.activeDocument) return alert("no document active!") ;

    // layers include both ArtLayer and LayerSet (Group)
    var layers = app.activeDocument.layers;

    for (var i = 0; i< layers.length ;++i ) 
    {   
        // order relate to its parent container
        layers[i]._Zorder = layers.length - i;

        //for output proper indent 
        layers[i]._Depth = 1;

        //traverse layers recursively
        traverse(layers[i],file);
    }

    file.write( "</Window>") ; 
}

function main()
{


    saveFile =  File.saveDialog("","*.xml");
    if(!saveFile) return;

    saveFile.encoding = "UTF8";
    saveFile.open("w", "TEXT", "");

    saveFile.write(createXMLRoot());
    saveFile.write(Root());

    traverseDocoment(saveFile);

    saveFile.write(RootEnd());


    if (!saveFile.error ) {
        alert("Succ!");
    }
    else{
        alert("Fail :" + saveFile.error);
    }
    saveFile.close();
}

main()
