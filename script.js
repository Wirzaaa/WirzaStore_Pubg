// Produk UC Data
        const ucProducts = [
            { id: 1, amount: '60 UC', price: 12000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 2, amount: '125 UC', price: 23000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 3, amount: '325 UC', price: 58000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 4, amount: '660 UC', price: 110000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 5, amount: '720 UC', price: 120000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 6, amount: '1080 UC', price: 170000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 7, amount: '1440 UC', price: 220000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 8, amount: '2160 UC', price: 325000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 9, amount: '2880 UC', price: 440000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 10, amount: '3960 UC', price: 580000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 11, amount: '4500 UC', price: 660000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' },
            { id: 12, amount: '8100 UC', price: 1100000, img: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png' }
        ];
        // Format Rupiah
        function formatRupiah(num) {
            return 'Rp ' + num.toLocaleString('id-ID');
        }
        // Render UC Grid
        function renderUCGrid() {
            const grid = document.getElementById('ucGrid');
            grid.innerHTML = '';
            ucProducts.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'uc-card';
                card.innerHTML = `
                    <div class="uc-img"><img src="${prod.img}" alt="UC"></div>
                    <div class="uc-amount">${prod.amount}</div>
                    <div class="uc-price">${formatRupiah(prod.price)}</div>
                    <button onclick="addToCart(${prod.id})">Tambah ke Keranjang</button>
                `;
                grid.appendChild(card);
                // Animasi muncul
                setTimeout(() => card.style.opacity = 1, 100);
            });
        }
        // Cart Logic
        let cart = [];
        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.reduce((a, b) => a + (b.qty || 1), 0);
        }
        function addToCart(id) {
            const prod = ucProducts.find(p => p.id === id);
            const idx = cart.findIndex(item => item.id === id);
            if (idx > -1) {
                cart[idx].qty += 1;
            } else {
                cart.push({ ...prod, qty: 1 });
            }
            updateCartCount();
            showCartModal(true);
            renderCart();
            // Animasi scale pada cart icon
            const cartBtn = document.getElementById('cartBtn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => cartBtn.style.transform = '', 180);
        }
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartCount();
            renderCart();
        }
        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<div style="text-align:center;color:#aaa;margin-top:2rem;">Keranjang kosong.</div>';
            } else {
                cart.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'cart-item';
                    el.innerHTML = `
                        <div class="cart-item-img"><img src="${item.img}" alt="UC"></div>
                        <div class="cart-item-info">
                            <div class="cart-item-amount">${item.amount} <span style="color:#aaa;font-size:0.95em;">&times;${item.qty}</span></div>
                            <div class="cart-item-price">${formatRupiah(item.price * item.qty)}</div>
                        </div>
                        <button class="cart-item-remove" title="Hapus" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    `;
                    cartItems.appendChild(el);
                });
            }
            // Total
            const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            document.getElementById('cartTotal').textContent = formatRupiah(total);
        }
        // Cart Modal Show/Hide
        function showCartModal(show) {
            const modal = document.getElementById('cartModal');
            const overlay = document.getElementById('cartOverlay');
            if (show) {
                modal.classList.add('open');
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                modal.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
        document.getElementById('cartBtn').onclick = () => {
            showCartModal(true);
            renderCart();
        };
        document.getElementById('cartCloseBtn').onclick = () => showCartModal(false);
        document.getElementById('cartOverlay').onclick = () => showCartModal(false);
        // Checkout Button
        document.getElementById('cartCheckoutBtn').onclick = () => {
            if (cart.length === 0) return;
            alert('Checkout berhasil! (Simulasi, tidak ada proses pembayaran)');
            cart = [];
            updateCartCount();
            renderCart();
            showCartModal(false);
        };
        // Form Validation
        document.getElementById('topupForm').onsubmit = function(e) {
            e.preventDefault();
            let valid = true;
            const username = document.getElementById('username');
            const uid = document.getElementById('uid');
            // Username
            if (!username.value.trim()) {
                document.getElementById('errUsername').style.display = 'block';
                valid = false;
            } else {
                document.getElementById('errUsername').style.display = 'none';
            }
            // UID
            if (!uid.value.trim()) {
                document.getElementById('errUID').style.display = 'block';
                valid = false;
            } else {
                document.getElementById('errUID').style.display = 'none';
            }
            if (valid) {
                alert('Data akun berhasil disimpan!');
            }
        };
        // Hide error on input
        document.getElementById('username').oninput = () => document.getElementById('errUsername').style.display = 'none';
        document.getElementById('uid').oninput = () => document.getElementById('errUID').style.display = 'none';
        // Initial Render
        renderUCGrid();
        updateCartCount();
        renderCart();