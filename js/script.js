document.addEventListener('DOMContentLoaded', function() {

    // Efeito de fade-in ao rolar a página
    const sectionsToFade = document.querySelectorAll('.section-fade');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15, // A seção se torna visível quando 15% dela está na tela
    });

    sectionsToFade.forEach(section => {
        sectionObserver.observe(section);
    });

    // Função de busca para a tabela de produtos
    const searchInput = document.getElementById('searchInput');
    const productsTable = document.getElementById('productsTable');

    if (searchInput && productsTable) {
        searchInput.addEventListener('keyup', function() {
            const searchText = this.value.toLowerCase();
            const rows = productsTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let found = false;
                // Busca no SKU (célula 0), no Nome do Produto (célula 1) e na Categoria (célula 2)
                if (cells[0].innerText.toLowerCase().includes(searchText) || cells[1].innerText.toLowerCase().includes(searchText) || cells[2].innerText.toLowerCase().includes(searchText)) {
                    found = true;
                }
                
                if (found) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        });
    }

    // Lógica do Gráfico de Vendas (Chart.js)
    const salesChartCanvas = document.getElementById('salesChart');

    if (salesChartCanvas) {
        new Chart(salesChartCanvas, {
            type: 'line', 
            data: {
                labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [1500, 2100, 1800, 2500, 2300, 2800, 1850],
                    borderColor: 'rgb(13, 110, 253)',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Lógica do Toast de Notificação e validação
    const saveProductBtn = document.getElementById('saveProductBtn');
    const saveToast = document.getElementById('saveToast');
    const addProdutoModal = document.getElementById('addProdutoModal');

    if (saveProductBtn && saveToast && addProdutoModal) {
        saveProductBtn.addEventListener('click', () => {
            const form = document.getElementById('addProdutoForm');
            if (form.checkValidity()) {
                const modal = bootstrap.Modal.getInstance(addProdutoModal);
                modal.hide();

                const toast = new bootstrap.Toast(saveToast);
                toast.show();
                
                form.reset();
                form.classList.remove('was-validated');
            } else {
                form.classList.add('was-validated');
            }
        });
    }
});