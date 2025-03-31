const baseUri = "https://poetrydb.org/author/";

Vue.createApp({
    data() {
        return {
            poems: [],
            
            error: null,
            author: "",
        }
    },
    methods: {
        async getPoemsByAuthor() {
            if (this.author === "") {
                this.error = "Please enter an author name.";
                this.poems = [];  // Clear previous poems
                return;
            }
            const uri = baseUri + this.author;  // Build the URL dynamically

            // Log URI to the console before making the request
            console.log("Request URI: ", uri);

            try {
                const response = await axios.get(uri);
                this.poems = response.data; // Store the poem data
                this.error = null;
            }
            catch (ex) {
                this.poems = [];  // Clear previous poems
                this.error = "No poems found for this author.";  // Error message
            }
        },
    
        async sortPoems() {
            if (this.poems.length === 0) {
                this.error = "No poems available to sort.";
                return;
            }
            this.poems.sort((a, b) => a.title.localeCompare(b.title));  // Sort poems by title
            this.error = null;
        },
        
       

       
        
        cleanList() {
            this.poems = [];  // Clear the poem list
            this.error = null;
            this.author = "";  // Clear the author's input
        }
    },
}).mount("#app");
