// بيانات المواد الأساسية والمراحل
const initialData = {
    phase1: [
        { id: 'p1_1', name: 'ماسورة حائط', defaultQty: 0 },
        { id: 'p1_2', name: 'علبة حديد', defaultQty: 0 },
        { id: 'p1_3', name: 'علبة توزيع', defaultQty: 0 },
        { id: 'p1_4', name: 'جلبة', defaultQty: 0 },
        { id: 'p1_5', name: 'كوع', defaultQty: 0 },
        { id: 'p1_6', name: 'جوال جبص', defaultQty: 0 }
    ],
    phase2: [
        { id: 'p2_1', name: 'سلك 4 ملي', defaultQty: 0 },
        { id: 'p2_2', name: 'سلك 2.5 ملي', defaultQty: 0 },
        { id: 'p2_3', name: 'سلك 1.5 ملي', defaultQty: 0 },
        { id: 'p2_4', name: 'سلك رئيسي 10 ملي', defaultQty: 0 },
        { id: 'p2_5', name: 'طبلون', defaultQty: 0 },
        { id: 'p2_6', name: 'جوال جبص', defaultQty: 0 },
        { id: 'p2_7', name: 'شريط كهرباء', defaultQty: 0 }
    ],
    phase3: [
        { id: 'p3_1', name: 'لمبة سقف', defaultQty: 0 },
        { id: 'p3_2', name: 'لمبة 4 قدم', defaultQty: 0 },
        { id: 'p3_3', name: 'لمبة 2 قدم', defaultQty: 0 },
        { id: 'p3_5', name: 'لمبات طاير LED', defaultQty: 0 },
        { id: 'p3_9', name: 'لمبات زينة أباجورة', defaultQty: 0 },
        { id: 'p3_21', name: 'لمبات اسبوط لايت', defaultQty: 0 },
        { id: 'p3_4', name: 'نجفة', defaultQty: 0 },
        { id: 'p3_6', name: 'بلاك 12 أمبير', defaultQty: 0 },
        { id: 'p3_7', name: 'بلاك 13 أمبير', defaultQty: 0 },
        { id: 'p3_13', name: 'مفتاح 3 خط', defaultQty: 0 },
        { id: 'p3_14', name: 'مفتاح 2 خط', defaultQty: 0 },
        { id: 'p3_15', name: 'مفتاح 1 خط', defaultQty: 0 },
        { id: 'p3_16', name: 'مفتاح جرس', defaultQty: 0 },
        { id: 'p3_17', name: 'مفتاح مكيف', defaultQty: 0 },
        { id: 'p3_18', name: 'مروحة سقف', defaultQty: 0 },
        { id: 'p3_19', name: 'مروحة شفط (حمام/مطبخ)', defaultQty: 0 },
        { id: 'p3_12', name: 'جوال جبص', defaultQty: 0 },
        { id: 'p3_10', name: 'جرس', defaultQty: 0 },
        { id: 'p3_11', name: 'لمبة كتوفة حائط (لباب الشارع)', defaultQty: 0 },
        { id: 'p3_8', name: 'شريط كهرباء', defaultQty: 0 },
        { id: 'p3_20', name: 'فشل', defaultQty: 0 }
    ]
};

// المقادير الافتراضية لشقة جديدة
const defaultApartmentValues = {
    'p1_1': 50, 'p1_2': 30, 'p1_3': 30, 'p1_4': 15, 'p1_5': 20, 'p1_6': 1,
    'p2_1': 2, 'p2_2': 4, 'p2_3': 6, 'p2_4': 1, 'p2_5': 1, 'p2_6': 1, 'p2_7': 10,
    'p3_1': 12, 'p3_2': 5, 'p3_3': 2, 'p3_4': 1, 'p3_5': 15, 'p3_6': 15, 'p3_7': 15,
    'p3_8': 10, 'p3_9': 6, 'p3_10': 1, 'p3_11': 1, 'p3_12': 1, 'p3_13': 5, 'p3_14': 4,
    'p3_15': 5, 'p3_16': 1, 'p3_17': 3, 'p3_18': 5, 'p3_19': 2
};

document.addEventListener('DOMContentLoaded', () => {
    renderItems('phase1', initialData.phase1);
    renderItems('phase2', initialData.phase2);
    renderItems('phase3', initialData.phase3);
    calculateTotal();
});

// عرض المواد الأساسية
function renderItems(containerId, items) {
    const container = document.getElementById(`${containerId}-container`) || document.getElementById(containerId);
    if (!container) return;

    items.forEach(item => {
        const html = `
            <div class="product-item item-row d-flex align-items-center justify-content-between mb-2 p-2 border-bottom" id="item-card-${item.id}">
                <div class="item-info">
                    <strong class="item-name product-name">${item.name}</strong>
                    <input type="text" class="form-control form-control-sm note-input item-note mt-1" id="note-${item.id}" placeholder="ملاحظات (ماركة / لون)...">
                </div>
                <div class="d-flex align-items-center gap-1 counter-control">
                    <button type="button" class="btn btn-outline-danger btn-sm qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                    <input type="number" class="qty-input qty-val form-control form-control-sm text-center" id="input-${item.id}" value="${item.defaultQty}" min="0" style="width: 60px;" oninput="calculateTotal()">
                    <button type="button" class="btn btn-outline-success btn-sm qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// تحديث الكميات
function updateQty(target, change) {
    let input;
    if (typeof target === 'string') {
        input = document.getElementById(`input-${target}`);
    } else if (target instanceof HTMLElement) {
        input = target.parentElement.querySelector('.qty-input');
    }

    if (input) {
        let current = parseInt(input.value) || 0;
        let updated = Math.max(0, current + change);
        input.value = updated;
        calculateTotal();
    }
}

// حساب المجموع الكلي
function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.qty-input').forEach(input => {
        total += parseInt(input.value) || 0;
    });

    const totalEl = document.getElementById('totalItemsCount');
    if (totalEl) {
        totalEl.innerText = `${total} قطعة`;
    }
}

// تعبئة النموذج القياسي
function loadDefaultTemplate() {
    if (confirm('هل تريد تعبئة الأعداد الافتراضية لشقة جديدة؟')) {
        Object.keys(defaultApartmentValues).forEach(id => {
            const input = document.getElementById(`input-${id}`);
            if (input) {
                input.value = defaultApartmentValues[id];
            }
        });
        calculateTotal();
    }
}

// تصفير المدخلات
function resetAll() {
    if (confirm('تصفير جميع الكميات والملاحظات؟')) {
        document.querySelectorAll('.qty-input').forEach(i => i.value = 0);
        document.querySelectorAll('.note-input').forEach(i => i.value = '');
        
        const siteName = document.getElementById('siteName') || document.getElementById('clientName');
        const supplierPhone = document.getElementById('supplierPhone') || document.getElementById('clientPhone');
        
        if (siteName) siteName.value = '';
        if (supplierPhone) supplierPhone.value = '';

        calculateTotal();
    }
}

// إضافة عنصر مخصص - تُجبر المستخدم على التحديد اختيارياً
function addCustomItemPrompt(forcedContainer) {
    let targetPhase = '';

    // السؤال لإتاحة خيار تحديد القسم دائماً
    const choice = prompt(
        "اختر القسم الذي تريد إضافة العنصر إليه:\n\n" +
        "1 - مرحلة التأسيس (العلب والمواسير)\n" +
        "2 - مرحلة وضع الأسلاك والطبلون\n" +
        "3 - مرحلة تركيب اللمبات والتشطيب\n\n" +
        "أدخل رقم القسم (1 أو 2 أو 3):", 
        "1"
    );

    if (choice === '1') targetPhase = 'phase1';
    else if (choice === '2') targetPhase = 'phase2';
    else if (choice === '3') targetPhase = 'phase3';
    else return; // إذا تم الضغط على Cancel أو إدخال رقم خاطئ

    const itemName = prompt("أدخل اسم المادة أو العنصر الجديد:");
    if (!itemName || itemName.trim() === "") return;

    const itemQtyInput = prompt(`أدخل الكمية المطلوبة لـ (${itemName}):`, "1");
    const itemQty = parseInt(itemQtyInput) || 1;

    const itemNotes = prompt(`ملاحظات / ماركة / لون (اختياري):`, "");

    let container = document.getElementById(`${targetPhase}-container`) || document.getElementById(targetPhase);

    if (!container) {
        alert("لم يتم العثور على القسم المحدد.");
        return;
    }

    const customId = 'custom_' + Date.now();
    const newItemHTML = `
        <div class="product-item item-row d-flex align-items-center justify-content-between mb-2 p-2 border-bottom" id="item-card-${customId}">
            <div class="item-info">
                <strong class="item-name product-name">${itemName}</strong>
                <input type="text" class="form-control form-control-sm note-input item-note mt-1" value="${itemNotes || ''}" placeholder="ملاحظات (ماركة / لون)...">
            </div>
            <div class="d-flex align-items-center gap-1 counter-control">
                <button type="button" class="btn btn-outline-danger btn-sm qty-btn" onclick="updateQty(this, -1)">-</button>
                <input type="number" class="qty-input qty-val form-control form-control-sm text-center" value="${itemQty}" min="0" style="width: 60px;" oninput="calculateTotal()">
                <button type="button" class="btn btn-outline-success btn-sm qty-btn" onclick="updateQty(this, 1)">+</button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', newItemHTML);
    calculateTotal();
}

// صياغة النص مقسمة حسب المراحل
function buildReportText() {
    const clientNameInput = document.getElementById('siteName') || document.getElementById('clientName');
    const clientName = clientNameInput && clientNameInput.value.trim() !== '' ? clientNameInput.value.trim() : 'غير محدد';

    let text = `⚡ *طلبية مستلزمات كهرباء*\n`;
    text += `📍 *الموقع / العميل:* ${clientName}\n`;
    text += `──────────────────\n\n`;

    let totalItemsCount = 0;

    const phases = [
        { id: 'phase1', title: '1. مرحلة التأسيس (العلب والمواسير)' },
        { id: 'phase2', title: '2. مرحلة وضع الأسلاك والطبلون' },
        { id: 'phase3', title: '3. مرحلة تركيب اللمبات والتشطيب' }
    ];

    phases.forEach(phase => {
        const container = document.getElementById(`${phase.id}-container`) || document.getElementById(phase.id);
        if (!container) return;

        const items = container.querySelectorAll('.product-item, .item-row');
        let phaseText = '';

        items.forEach(item => {
            const nameEl = item.querySelector('.product-name, .item-name, strong');
            const qtyEl = item.querySelector('.qty-input, .qty-val');
            const noteEl = item.querySelector('.note-input, .item-note');

            const name = nameEl ? nameEl.innerText.trim() : '';
            const qty = qtyEl ? (parseInt(qtyEl.value) || 0) : 0;
            const note = noteEl ? noteEl.value.trim() : '';

            if (qty > 0 && name !== '') {
                totalItemsCount += qty;
                phaseText += `  ▫️ *${name}*: ${qty} ${note ? `(_${note}_)` : ''}\n`;
            }
        });

        if (phaseText !== '') {
            text += `📌 *${phase.title}*\n${phaseText}\n`;
        }
    });

    if (totalItemsCount === 0) {
        return null;
    }

    text += `──────────────────\n`;
    text += `✅ *إجمالي المواد المطلوب توريدها:* ${totalItemsCount} قطعة\n`;
    text += `👷‍♂️ *تمت المراجعة بواسطة تطبيق المهندس *`;

    return text;
}

// إرسال النص إلى الواتساب
function sendToWhatsApp() {
    const text = buildReportText();
    if (!text) {
        alert('يرجى اختيار أو إضافة عنصر واحد على الأقل بكمية أكبر من صفر!');
        return;
    }

    const phoneInput = document.getElementById('supplierPhone') || document.getElementById('clientPhone');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = phone 
        ? `https://wa.me/${phone}?text=${encodedText}` 
        : `https://api.whatsapp.com/send?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
}

// معاينة الرسالة
function previewAndShare() {
    sendToWhatsApp();
}