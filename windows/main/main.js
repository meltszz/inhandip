window.api.send("send-ipv4");
window.api.receive("receive-ipv4", (e, ipv4) => $("#lbl-ip").text(ipv4));

$('#btn-copy-ip').on('click', () => {
    const ipv4 = $('#lbl-ip').text();
    console.log(ipv4)
    navigator.clipboard.writeText(ipv4);
});