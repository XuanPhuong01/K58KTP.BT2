document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const masv = document.getElementById('masv').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<p>⏳ Đang tìm kiếm...</p>";

    try {
        const response = await fetch(`http://localhost:1880/timkiem?q=${masv}`);
        const text = await response.text(); // 🔍 đọc phản hồi dạng text
        console.log("📡 Phản hồi từ server:", text); // log ra để xem thực tế

        if (!text) {
            throw new Error("Phản hồi rỗng từ server Node-RED!");
        }

        const data = JSON.parse(text);

        if (data.error) {
            resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
        } else if (data.length === 0) {
            resultDiv.innerHTML = `<p style="color:orange;">Không tìm thấy sinh viên có mã "${masv}"</p>`;
        } else {
            const sv = data[0];
            resultDiv.innerHTML = `
                <h3>📘 Thông tin sinh viên</h3>
                <p><b>Mã SV:</b> ${sv.MaSV}</p>
                <p><b>Họ tên:</b> ${sv.HoTen}</p>
                <p><b>Lớp:</b> ${sv.Lop}</p>
                <p><b>Ngày sinh:</b> ${sv.NgaySinh}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
        console.error(error);
    }
});
