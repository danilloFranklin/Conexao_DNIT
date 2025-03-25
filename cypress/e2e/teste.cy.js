it("Valida e busca um item na API com duas variáveis", () => { 
    const sofrimento = "valor1"; // Defina a primeira variável
    const desistencia = "valor2"; // Defina a segunda variável

    cy.request({
        method: "GET",
        url: "https://conexao-dnit-hom.labtrans.ufsc.br/api/v1/reports/practices?idCity=&idState=&idInstitution=&idDiscipline=&idActivity=&idTeachingModality=&idStatus=&limit=10&page=1&order=&partnershipFilter=&keyword=",
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN1YiI6IjExODYyMTQ1NjI4IiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYW1yIjpbInBhc3N3ZCIsImNhcHRjaGEiXSwicHJvZmlsZSI6Imh0dHBzOi8vc2Vydmljb3Muc3RhZ2luZy5hY2Vzc28uZ292LmJyLyIsImtpZCI6InJzYTEiLCJpc3MiOiJodHRwczovL3Nzby5zdGFnaW5nLmFjZXNzby5nb3YuYnIvIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoidHJ1ZSIsInByZWZlcnJlZF91c2VybmFtZSI6IjExODYyMTQ1NjI4Iiwibm9uY2UiOiJQVDd0djc2aSIsInBpY3R1cmUiOiJodHRwczovL3Nzby5zdGFnaW5nLmFjZXNzby5nb3YuYnIvdXNlcmluZm8vcGljdHVyZSIsImF1ZCI6ImNvbmV4YW8tZG5pdC1ob20ubGFidHJhbnMudWZzYy5iciIsImF1dGhfdGltZSI6MTc0Mjg0NjU3Niwic2NvcGUiOlsicGhvbmUiLCJvcGVuaWQiLCJwcm9maWxlIiwiZ292YnJfZW1wcmVzYSIsImVtYWlsIl0sIm5hbWUiOiJLcnljaWEgQXpldmVkbyIsInBob25lX251bWJlciI6IjMxOTk1MDQ4MzM5IiwiZXhwIjoxNzQyODQ3MTc3LCJpYXQiOjE3NDI4NDY1NzcsImp0aSI6ImY1MGJkOGJkLTM4NGUtNDYwYi04ZmJiLWY2MTY1YTIwYjVjYyIsImVtYWlsIjoia3J5Y2lhLmxhYnRyYW5zQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDI4NDY2MjAsImV4cCI6MTc0Mjg1MzgyMH0.JNLnmhBI97T2c5VlQhG-hp8nHVPtnKHRv0TLlYgE580",
        },
    }).then((response) => {
        // **Validação do Status Code**
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("count"); // Certifica-se de que "count" existe
        expect(response.body.count).to.be.an("array"); // Certifica-se de que é um array
    });
});
