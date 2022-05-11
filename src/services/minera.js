import axios from "axios"

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

const minera = {
    obtenerSemaforos() {
        return http.get('/semaforos');
    },
    obtenerVehiculos() {
        return http.get('/vehiculos');
    },
    actualizarSemaforo(semaforo) {
        return http.put('/semaforos', semaforo);
    },
    login(user, passwd) {
        return http.post('/usuarios/login', { user, passwd });
    }
};

export default minera;