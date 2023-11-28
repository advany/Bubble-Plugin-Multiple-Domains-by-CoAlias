function(instance, properties, context) {
    
    function update_ncm_urls() {
        let parent
        
        instance.publishState('url_iframe', window.location.href);
        
        try {
            instance.publishState('url', top.location.href);
            
            parent = new URL(top.location.href);

            instance.publishState('pathname', parent.pathname);
            instance.publishState('search', parent.search);
            instance.publishState('hash', parent.hash);
        } catch (e) {
            console.log('NoCodeMayo cant access top window (1) ' + e)
        }
        
        let iframe = new URL(window.location.href);
        
        instance.publishState('pathname_iframe', iframe.pathname);
        instance.publishState('search_iframe', iframe.search);
        instance.publishState('hash_iframe', iframe.hash);
        
        try {
            instance.publishState('parameter_1', parent.searchParams.get(properties.parameter_1));
            instance.publishState('parameter_2', parent.searchParams.get(properties.parameter_2));
            instance.publishState('parameter_3', parent.searchParams.get(properties.parameter_3));
            instance.publishState('parameter_4', parent.searchParams.get(properties.parameter_4));
            instance.publishState('parameter_5', parent.searchParams.get(properties.parameter_5));
        } catch(e) {
            console.log('NoCodeMayo cant access top window (2) ' + e)
        }
        
        instance.publishState('parameter_1_iframe', iframe.searchParams.get(properties.parameter_1));
        instance.publishState('parameter_2_iframe', iframe.searchParams.get(properties.parameter_2));
        instance.publishState('parameter_3_iframe', iframe.searchParams.get(properties.parameter_3));
        instance.publishState('parameter_4_iframe', iframe.searchParams.get(properties.parameter_4));
        instance.publishState('parameter_5_iframe', iframe.searchParams.get(properties.parameter_5));
    }
    
    
    update_ncm_urls();
    
    jQuery(function(){
        window.addEventListener('popstate', function (event) {
            setTimeout(update_ncm_urls,0);
        })

        top.addEventListener('popstate', function (event) {
            setTimeout(update_ncm_urls,0);
        })

        window.addEventListener('hashchange', function (event) {
            setTimeout(update_ncm_urls,0);
        })

        top.addEventListener('hashchange', function (event) {
            setTimeout(update_ncm_urls,0);
        })
        
        let ncm_iframe_pushState = window.history.pushState;
        window.history.pushState = function(e) {
            ncm_iframe_pushState.apply(window.history, arguments)
            setTimeout(update_ncm_urls,0);
        }
        
        try {
        	let ncm_top_pushState = top.history.pushState;
            let ncm_top_history = top.history;
            top.history.pushState = function(e) {
                ncm_top_pushState.apply(ncm_top_history, arguments)
                setTimeout(update_ncm_urls,0);
            }
        } catch (e) {
            console.log('NoCodeMayo cant access top window (3) ' + e)
        }
        
        let ncm_iframe_replaceState = window.history.replaceState;
        window.history.replaceState = function(e) {
            ncm_iframe_replaceState.apply(window.history, arguments)
            setTimeout(update_ncm_urls,0);
        }

        try {
            let ncm_top_replaceState = top.history.replaceState;
            top.history.replaceState = function(e) {
                ncm_top_replaceState.apply(top.history, arguments)
                setTimeout(update_ncm_urls,0);
            }
        } catch (e) {
            console.log('NoCodeMayo cant access top window (4) ' + e)
        }
    })
}