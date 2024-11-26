const axios = require('axios');

let data = [];
let odds = {};

const fetchData = async () => {
    try {
        const url = 'https://fito24.com/rdstn';
        const payload = JSON.stringify([
            ["gf", ["s2_l43.111671118","s2_l43.111668658","s2_l43.111668624","s2_l43.111668553","s2_l43.111699354","s2_l43.111668235","s2_l43.111668609","s2_l43.111668600","s2_l43.111668652","s2_l43.111668209"], [1001, 1018, "score", "timer", "state", "redc", "yelc", "corner", "_pn", "_error", "_sc"]],
            ["ga", ["bm_cs530_1","bm_cc530_102","bm_cc530_23","bm_cc530_19","bm_cc530_97","bm_cc530_67","bm_cc530_87","bm_cc530_76","bm_cc530_103","bm_cc530_452","bm_ct530_92783","bm_ct530_51971","bm_ct530_36644","bm_ct530_644","bm_ct530_93906","bm_ct530_13881","bm_ct530_3024","bm_ct530_873","bm_ct530_16936","bm_cg530_59","bm_cg530_65","bm_cg530_73","bm_cl530_15439648","bm_cl530_15416308","bm_cl530_15460038","bm_cl530_15413282","bm_cl530_15459950","bm_cl530_15441034","bm_cl530_15446200","bm_cl530_15447046","bm_cl530_15447948","bm_cl530_15444094","bm_cs9_1","bm_cc9_102","bm_cc9_23","bm_cc9_19","bm_cc9_97","bm_cc9_67","bm_cc9_87","bm_cc9_76","bm_cc9_103","bm_cc9_452","bm_ct9_92783","bm_ct9_51971","bm_ct9_36644","bm_ct9_644","bm_ct9_93906","bm_ct9_13881","bm_ct9_3024","bm_ct9_873","bm_ct9_16936","bm_cg9_59","bm_cg9_65","bm_cg9_73","bm_cl9_15439648","bm_cl9_15416308","bm_cl9_15460038","bm_cl9_15413282","bm_cl9_15459950","bm_cl9_15441034","bm_cl9_15446200","bm_cl9_15447046","bm_cl9_15447948","bm_cl9_15444094","bm_cs5_1","bm_cc5_102","bm_cc5_23","bm_cc5_19","bm_cc5_97","bm_cc5_67","bm_cc5_87","bm_cc5_76","bm_cc5_103","bm_cc5_452","bm_ct5_92783","bm_ct5_51971","bm_ct5_36644","bm_ct5_644","bm_ct5_93906","bm_ct5_13881","bm_ct5_3024","bm_ct5_873","bm_ct5_16936","bm_cg5_59","bm_cg5_65","bm_cg5_73","bm_cl5_15439648","bm_cl5_15416308","bm_cl5_15460038","bm_cl5_15413282","bm_cl5_15459950","bm_cl5_15441034","bm_cl5_15446200","bm_cl5_15447046","bm_cl5_15447948","bm_cl5_15444094","bm_sts0_15439648","bm_sts0_15416308","bm_sts0_15460038","bm_sts0_15413282","bm_sts0_15459950","bm_sts0_15441034","bm_sts0_15446200","bm_sts0_15447046","bm_sts0_15447948","bm_sts0_15444094"]]
        ]);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: payload
        };

        const response = await axios(url, options);

        if (response.status === 200) {
            data = response.data;
            console.log('Data fetched successfully`');  // Added console log
        } else {
            console.error(`Failed to fetch data: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

module.exports = {
    getData: () => data,
    getOdds: () => odds,
    fetchData
};