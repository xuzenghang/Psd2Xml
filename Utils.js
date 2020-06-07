

var INDENT = "    "
var INDENT_PROPERTT = "  ";

function repeatString(str,times)
{
    var result = "";
    for(i = 0;i < times; ++ i)
    {
        result += str;
    }
    return result;

}

function createXMLRoot()
{
    return "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\n";
}

function Root()
{
    return formatType("Document","root") + "\n"
    + INDENT_PROPERTT + formatProprety("ContentSize","{"+ app.activeDocument.width + "," + app.activeDocument.height + "}")+ "\n"
    + "\n";
}

function RootEnd()
{
    return "</xml>"
}

function formatProprety(name,value)
{
    return "<Property Name=\"" + name+ "\" Value=\"" + value + "\" \/>";
}

function formatZorder(layer)
{   
    return formatProprety("Zorder",layer._Zorder)
}

function formatPosition(layer)
{   

    var bounds = layer.bounds
    var x1 = bounds[0]
    var y1 = bounds[1]
    if (layer.parent.typename == "LayerSet")
    {  
        var parentBounds = layer.parent.bounds
        var xx1 = parentBounds[0]
        var yy1 = parentBounds[1]
        x1 = x1 - xx1  
        y1 = y1 - yy1   
    }
    return formatProprety("Position","{"+ x1 + ","+ y1 + "}")
}

function formatContentSize(layer)
{   
    var bounds = layer.bounds
    var width =  bounds[2] -bounds[0]
    var height = bounds[3] -bounds[1]
    return formatProprety("ContentSize","{"+width.toString().split(" ")[0] + ","+ height.toString().split(" ")[0] + "}")
}

function formatColor(layer)
{   
    return formatProprety("Color",layer.textItem.color.rgb.hexValue)
}

function formatString(layer)
{  
    return formatProprety("String",layer.textItem.contents)
}

function formatFontSize(layer)
{   
    if(layer.textItem)
    {  
        return formatProprety("FontSize",Math.floor(layer.textItem.size))
    }
}

function formatType(type,name)
{   
    return "<Window Type=\"" + type　+ "\" Name=\"" + name + "\" >"
}
