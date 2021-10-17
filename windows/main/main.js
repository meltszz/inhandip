window.api.send("send-ipv4");
window.api.receive("receive-ipv4", (e, ipv4) => $("#lbl-ip").text(ipv4));