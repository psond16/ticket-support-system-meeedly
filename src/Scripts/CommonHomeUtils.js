const CommonHomeutils = {
    saveCounter: function (count) {
        localStorage.setItem("homeCounter", count);
        console.log(`[Homeutils] Saved count to localStorage: ${count}`);
    },

    getSavedCounter: function () {
        const val = localStorage.getItem("homeCounter");
        return val !== null ? parseInt(val, 10) : 0;
    },

    //local storage for tickets
    saveTickets: function (tickets) {
        localStorage.setItem("tickets", JSON.stringify(tickets));
        console.log("[Homeutils] Saved tickets to localStorage");
    },

    getSavedTickets: function () {
        const val = localStorage.getItem("tickets");
        return val ? JSON.parse(val) : [];
    }
};

export default CommonHomeutils;