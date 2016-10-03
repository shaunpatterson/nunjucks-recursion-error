export default function(url, core) {
    if(url.search(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/) != -1){
        return url;
    }
    else{
        if(url.indexOf('/') == 0){
            // Remove the first slash
            url.replace('/', '');
        }
        return core.contextPath + url;
    }
}
