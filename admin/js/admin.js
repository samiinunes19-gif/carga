document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    loadMockData();
});

function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active to clicked
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Update page title
            const titleMap = {
                'dashboard': 'Visão Geral',
                'orders': 'Gestão de Pedidos',
                'marketing': 'Controle de Marketing',
                'pages': 'Páginas do Site'
            };
            document.getElementById('page-title').innerText = titleMap[targetId];
        });
    });
}

function loadMockData() {
    const ordersData = [
        { id: '#1042', name: 'João Silva', phone: '(11) 98765-4321', amount: 'R$ 30,00', operator: 'TIM', method: 'PIX', status: 'Aprovado' },
        { id: '#1041', name: 'Maria Oliveira', phone: '(21) 99999-8888', amount: 'R$ 50,00', operator: 'Vivo', method: 'Cartão', status: 'Aprovado' },
        { id: '#1040', name: 'Carlos Santos', phone: '(31) 91234-5678', amount: 'R$ 20,00', operator: 'Claro', method: 'PIX', status: 'Pendente' },
        { id: '#1039', name: 'Ana Costa', phone: '(41) 97777-6666', amount: 'R$ 100,00', operator: 'Oi', method: 'Cartão', status: 'Falhou' },
        { id: '#1038', name: 'Lucas Souza', phone: '(51) 95555-4444', amount: 'R$ 40,00', operator: 'Correios', method: 'PIX', status: 'Aprovado' },
    ];

    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    ordersData.forEach(order => {
        let badgeClass = '';
        if(order.status === 'Aprovado') badgeClass = 'badge-success';
        if(order.status === 'Pendente') badgeClass = 'badge-warning';
        if(order.status === 'Falhou') badgeClass = 'badge-danger';

        const row = `
            <tr>
                <td style="font-weight: 500;">${order.id}</td>
                <td>
                    <div>${order.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${order.phone}</div>
                </td>
                <td>${order.operator}</td>
                <td style="font-weight: 600;">${order.amount}</td>
                <td>${order.method}</td>
                <td><span class="badge ${badgeClass}">${order.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function saveMarketingSettings(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Salvando...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = 'Configurações Salvas!';
        btn.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.disabled = false;
        }, 2000);
    }, 800);
}
