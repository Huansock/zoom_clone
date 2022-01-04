# Noom

zoom clone with web RTC and web socket

## websocket vs http

둘 다 인터넷 연결 프로토콜인데
http는 한 번 req res 하면 까먹는 바보 천지이지만
websocket은 계속 연결되서 기억하고 있는 아주 똑똑한 놈이다. 그러니 리얼타임 카카오톡 같은 걸 만들고 싶으면
websocket을 써야한다는 이야기다.

이번엔 websocket을 node로 이용할 것이다.

## socket io vs websocket

socket io 는 웹소켓의 대체제가 아니다.
socket io는 그냥 하나의 라이브러리이고 웹소켓을 프로토콜로 사용하고 있을 뿐이다.
다시 한 번 말하자면 웹소켓은 프로토콜이고 socket io는 그냥 쉽게 양방향 통신을 할 수 있는 라이브러리이다.
연결이 끊겼을 때 자동 재연결도 해준다구!!

## socket.on 과 socket.join

socket.on 은 socket.emit 과 함께 붙어다니는 짝궁이다. 프론트에서

```
socket.emit("이벤트이름",보내고 싶은 거 ,콜백함수)
```

이렇게해서 보내면 socket.on으로 받는다.

socket.join은 채팅방에 들어가고 싶을 때 쓴다.
