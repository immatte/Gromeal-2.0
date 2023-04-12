
/**
 * This is a helper class that places all "knowledge" about doing a fetch() in one place. 
 * Any component that needs to do a fetch() will import this class and call the corresponding method.
 * 
 * All methods call the internal/private _doFetch() method, which does all the work. It returns
 * a "unified" myresponse obj that has four properties:
 *   ok: true if the server response is OK, false otherwise
 *   data: the response data if OK, null otherwise
 *   status: the response status code if the server was reached; 0 otherwise
 *   error: the error message if there was either a server or network error, '' otherwise
 **/

class SpoonApi {

    /**
     * Public methods that your components will call
     **/

    static async getRandomRecipes() {
        // Production
        // return await this._doFetch(`${SPOON_BASE_URL}/recipes/random`);
        
        // return await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ISA_KEY}&number=10`);


        // Development
        return await this._doFetch("/test/random.json");
    }


    /**
     * Private method for internal use only
     **/

    static async _doFetch(url, method = 'GET', body = null) {
        // Prepare fetch() options
        let options = { 
            method,
            headers: {'Content-Type': 'application/json'}
        };

        // Add the body if one is supplied
        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        // Do the fetch() and store the results in a "unified" myresponse obj
        let myresponse = { ok: false, data: null, status: 0, error: '' };
        try {
            let response = await fetch(url, options);
            if (response.ok) {
                myresponse.ok = true;
                myresponse.data = await response.json();
                myresponse.status = response.status;
            } else {
                myresponse.status = response.status;
                myresponse.error = response.statusText;
            }
        } catch (err) {
            myresponse.error = err.message;
        }

        return myresponse;
    }

}

export default SpoonApi;