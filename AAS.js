let productCounter = 1; // Counter untuk kode produk
const productForm = document.getElementById("formdata");
const productTable = document.getElementById("product-list");
let editRow = null; // Baris yang sedang diedit

// Event listener untuk submit form tambah produk
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Ambil nilai dari form
  const kodeProduk = `MD-${productCounter.toString().padStart(3, "0")}`;
  const namaProduk = document.getElementById("nama_produk").value;
  const hargaProduk = parseFloat(
    document.getElementById("harga_produk").value
  ).toFixed(2);
  const satuanProduk = document.getElementById("satuan_produk").value;
  const kategoriProduk = document.getElementById("kategori_produk").value;
  const stockProduk = parseInt(
    document.getElementById("stock_produk").value,
    10
  );
  const gambarProduk = document.getElementById("gambar_produk").value;

  // Validasi input
  if (!namaProduk || !hargaProduk || isNaN(stockProduk) || stockProduk < 0) {
    alert("Pastikan semua data diisi dengan benar!");
    return;
  }

  // Tambahkan baris baru ke tabel
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${productCounter}</td>
    <td>${kodeProduk}</td>
    <td>${namaProduk}</td>
    <td>${hargaProduk}</td>
    <td>${satuanProduk}</td>
    <td>${kategoriProduk}</td>
    <td class="${stockProduk < 5 ? "bg-red" : ""}">${stockProduk}</td>
    <td><img src="${gambarProduk}" alt="${namaProduk}" style="width:50px; height:50px;"></td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Hapus</button>
    </td>
  `;

  // Tambahkan event listener untuk tombol edit
  row
    .querySelector(".edit-btn")
    .addEventListener("click", () => openEditModal(row));

  // Tambahkan event listener untuk tombol hapus
  row.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      row.remove();
    }
  });

  productTable.appendChild(row);
  productCounter++; // Tambahkan counter
  productForm.reset(); // Reset form
});

// Fungsi untuk membuka modal edit
const openEditModal = (row) => {
  editRow = row;
  const cells = row.querySelectorAll("td");

  // Isi form dengan data dari baris
  document.getElementById("id_produk").value = cells[1].innerText;
  document.getElementById("nama_produk").value = cells[2].innerText;
  document.getElementById("harga_produk").value = cells[3].innerText;
  document.getElementById("satuan_produk").value = cells[4].innerText;
  document.getElementById("kategori_produk").value = cells[5].innerText;
  document.getElementById("stock_produk").value = cells[6].innerText;
  document.getElementById("gambar_produk").value =
    cells[7].querySelector("img").src;

  // Ubah tombol submit menjadi Update
  const submitButton = productForm.querySelector("button[type='submit']");
  submitButton.innerText = "Update";

  productForm.onsubmit = (e) => {
    e.preventDefault();

    // Update data di baris tabel
    cells[1].innerText = document.getElementById("id_produk").value;
    cells[2].innerText = document.getElementById("nama_produk").value;
    cells[3].innerText = parseFloat(
      document.getElementById("harga_produk").value
    ).toFixed(2);
    cells[4].innerText = document.getElementById("satuan_produk").value;
    cells[5].innerText = document.getElementById("kategori_produk").value;
    const stock = parseInt(document.getElementById("stock_produk").value, 10);
    cells[6].innerText = stock;
    cells[6].className = stock < 5 ? "bg-red" : "";
    cells[7].querySelector("img").src =
      document.getElementById("gambar_produk").value;

    // Reset form dan kembalikan tombol submit
    productForm.reset();
    submitButton.innerText = "Submit";
    productForm.onsubmit = null; // Kembali ke event listener default
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  };
};
