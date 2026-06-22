export default async function handler(req, res) {
    // Permitir apenas requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { amount, customerName, customerEmail, customerCpf, customerPhone, title } = req.body;

    // Chaves da MasterPag (Lidas de forma segura das variáveis de ambiente da Vercel)
    // Se não estiverem configuradas na Vercel, usarão os valores padrão informados
    const publicKey = process.env.MASTERPAG_PUBLIC_KEY || 'pk_live_xxxxxxxxxxxxxxxx';
    const secretKey = process.env.MASTERPAG_SECRET_KEY || 'sk_live_xxxxxxxxxxxxxxxx';

    try {
        const response = await fetch('https://api.masterpag.com/functions/v1/pix-receive', {
            method: 'POST',
            headers: {
                'x-public-key': publicKey,
                'x-secret-key': secretKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                paymentMethod: 'pix',
                customer: {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    document: {
                        number: customerCpf,
                        type: 'cpf'
                    }
                },
                items: [{
                    title: title,
                    unitPrice: parseFloat(amount),
                    quantity: 1,
                    tangible: true
                }]
            })
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        console.error('Erro na chamada da API MasterPag:', err);
        return res.status(500).json({ error: 'Erro interno no servidor', details: err.message });
    }
}
