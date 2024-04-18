// Diese Konfiguration erstellt die Chart, aber ohne spezifische Daten
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['HP', 'Defense', 'Attack'], // Geänderte Labels
        datasets: [{
            label: 'Abilities',
            data: [], // Daten werden später festgelegt
            backgroundColor: [], // Farben werden später festgelegt
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

