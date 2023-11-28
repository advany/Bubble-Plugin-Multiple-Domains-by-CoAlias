function(instance, context) {
	let current_url = window.location.hostname;

    let subdomain;

    if(current_url.includes(".") && current_url.split('.').length > 1) {
      subdomain = current_url.substring(0, current_url.indexOf("."));
    } else {
        subdomain = '';
    }
    
    if(typeof subdomain == 'string') instance.publishState('subdomain', subdomain);
    if(typeof window.location.hostname == 'string') instance.publishState('hostname', window.location.hostname);
}