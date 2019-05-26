class WebClient {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.url = "http://localhost:8080/websocket";
        this.connect();
    }

    connect() {
        console.log("Connecting to server...")
        let socket = new SockJS(this.url);
        this.stompClient = Stomp.over(socket);
        //holding reference
        let obj = this;
        this.stompClient.connect({}, function (frame) {
            obj.setConnected(true);
            console.log('Connected: ' + frame);
            obj.stompClient.subscribe('/topic/messages', function (greeting) {
                obj.showResponse(JSON.parse(greeting.body));
            });
        });
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        this.setConnected(false);
        console.log("Disconnected");
    }

    sendData(data) {
        this.stompClient.send("/app/chat", {}, JSON.stringify({ 'data': data }));
    }

    setConnected(value) {
        this.connected = value;
    }

    showResponse(message) {
        //TODO: Display message somewhere
        console.log(message)
    }
}
