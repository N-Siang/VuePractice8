<script>
export default {
    map: null,
    data() {
        return {
            cityData: [],
        }
    },
    methods: {
        cityArray(data) {

            data.forEach(city => {

                if (city.latlng?.length === 2) {
                    this.cityData.push(
                        {
                            name: city.name.official,
                            latlng: city.latlng,
                            capital: city.capital || '',
                            flags: city.flags,
                            currencies: city.currencies ? Object.values(city.currencies) : '',
                        })
                }
            });

            this.mapUpdate();
        },

        mapUpdate() {

            this.cityData.forEach(city => {
                var marker = L.marker(city.latlng).addTo(this.map);
                marker.bindPopup(`
                        <img src='${city.flags.svg}' class="flags">
                        <h5>(${city.latlng})</h5>
                        <b>${city.name}</b>
                        <h5>Capital : ${city.capital}</h5>
                        <h5>Currencies Symbol : ${city.currencies ? city.currencies[0].symbol : 'none'}</h5>
                        `);

            });

        },

    },
    mounted() {

        this.map = L.map('map').setView([23.5, 121], 7);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 50,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                this.cityArray(data);
            })

            .catch(error => {
                console.error('資料獲取錯誤', error)
                // alert('請稍後再試');
            });
    },

}

</script>

<template>
    <div id="app">
        <div id="map"></div>
    </div>
</template>

<style scoped>

h5 {
    margin: 0;
}

#map {
    width: 100%;
    height: 100vh;
    z-index: 8;
}

.leaflet-popup-content {
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
}

.flags {
    width: 40%;
    margin: auto;
}
</style>