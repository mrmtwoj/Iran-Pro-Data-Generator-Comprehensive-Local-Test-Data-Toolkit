const toolSelect = document.getElementById("toolSelect");
const dynamicOptions = document.getElementById("dynamicOptions");

Object.entries(tools).forEach(([key,val])=>{
    toolSelect.innerHTML += `<option value="${key}">${val}</option>`;
});

toolSelect.addEventListener("change", renderOptions);
renderOptions();

function renderOptions(){
    let tool = toolSelect.value;
    dynamicOptions.innerHTML = "";

    if(tool === "mobile"){
        dynamicOptions.innerHTML = selectTemplate("اپراتور","operator",operators);
    }

    if(tool === "card"){
        dynamicOptions.innerHTML = selectTemplate("بانک","bank",banks);
    }

    if(tool === "postal"){
        dynamicOptions.innerHTML = `
            <div class="form-group">
                <label>استان</label>
                <select id="province" onchange="updateCities()">
                    ${Object.keys(postalData).map(p=>`<option value="${p}">${p}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label>شهر</label>
                <select id="city"></select>
            </div>
        `;
        updateCities();
    }

    if(tool === "name"){
        dynamicOptions.innerHTML = `
            <div class="form-group">
                <label>زبان</label>
                <select id="lang">
                    <option value="fa">فارسی</option>
                    <option value="en">انگلیسی</option>
                </select>
            </div>
        `;
    }

    if(tool === "email"){
        dynamicOptions.innerHTML = `
            <div class="form-group">
                <label>دامنه ایمیل</label>
                <select id="emailDomain">
                    <option value="gmail.com">gmail.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                    <option value="yahoo.ir">yahoo.ir</option>
                    <option value="mail.ir">mail.ir</option>
                </select>
            </div>
        `;
    }

    if(tool === "password"){
        dynamicOptions.innerHTML = `
            <div class="form-group">
                <label>نوع رمز</label>
                <select id="passwordType">
                    <option value="simple">ساده</option>
                    <option value="complex">پیچیده</option>
                </select>
            </div>
        `;
    }

    if(tool === "address"){
        dynamicOptions.innerHTML = `
            <div class="form-group">
                <label>استان</label>
                <select id="province" onchange="updateCities()">
                    ${Object.keys(postalData).map(p=>`<option value="${p}">${p}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label>شهر</label>
                <select id="city"></select>
            </div>
        `;
        updateCities();
    }
}

function updateCities(){
    let province = document.getElementById("province").value;
    let citySelect = document.getElementById("city");
    citySelect.innerHTML = "";
    let cities = postalData[province];
    Object.keys(cities).forEach(city=>{
        citySelect.innerHTML += `<option value="${city}">${city}</option>`;
    });
}

function selectTemplate(label,id,obj){
    return `
    <div class="form-group">
        <label>${label}</label>
        <select id="${id}">
        ${Object.keys(obj).map(o=>`<option>${o}</option>`).join("")}
        </select>
    </div>`;
}

function generate(){
    let tool = toolSelect.value;
    let count = parseInt(document.getElementById("count").value);
    let result = [];

    for(let i=0;i<count;i++){
        if(tool==="mobile") result.push(generateMobile());
        if(tool==="melli") result.push(generateMelli());
        if(tool==="card") result.push(generateCard());
        if(tool==="sheba") result.push(generateSheba());
        if(tool==="postal") result.push(generatePostal());
        if(tool==="name") result.push(generateName(document.getElementById("lang").value));
        if(tool==="email") result.push(generateEmail());
        if(tool==="password") result.push(generatePassword(document.getElementById("passwordType").value));
        if(tool==="address") result.push(generateAddress());
    }

    document.getElementById("output").value = result.join("\n");
}

function generateMobile(){
    let op = document.getElementById("operator").value;
    let prefix = operators[op][Math.floor(Math.random()*operators[op].length)];
    return prefix + randomDigits(7);
}

function generateMelli(){
    let base;
    do { base = randomDigits(9); } while(/^(\d)\1+$/.test(base));
    let sum = 0;
    for(let i=0;i<9;i++) sum += parseInt(base[i])*(10-i);
    let r = sum % 11;
    let check = (r<2)?r:11-r;
    return base+check;
}

function generateCard(){
    let bank = document.getElementById("bank").value;
    let bins = banks[bank];
    let prefix = bins[Math.floor(Math.random()*bins.length)];
    let number = prefix + randomDigits(9);
    return number + calculateLuhn(number);
}

function generateSheba(){
    let account = randomDigits(24);
    let rearranged = account + "1827";
    let mod = BigInt(rearranged) % 97n;
    let check = (98n - mod).toString().padStart(2,'0');
    return "IR"+check+account;
}

function generatePostal(){
    let province = document.getElementById("province")?.value;
    let city = document.getElementById("city")?.value;
    if(!province || !city) return randomDigits(10);
    let range = postalData[province][city];
    if(!range) return randomDigits(10);
    let min = parseInt(range[0]);
    let max = parseInt(range[1]);
    let mainCode = Math.floor(Math.random() * (max - min + 1)) + min;
    let distributionCode = randomDigits(5);
    return (mainCode.toString() + distributionCode).padStart(10,"0");
}

function generateName(lang="fa"){
    if(lang==="fa"){
        return firstNamesFa[Math.floor(Math.random()*firstNamesFa.length)] + " " +
               lastNamesFa[Math.floor(Math.random()*lastNamesFa.length)];
    } else {
        return firstNamesEn[Math.floor(Math.random()*firstNamesEn.length)] + " " +
               lastNamesEn[Math.floor(Math.random()*lastNamesEn.length)];
    }
}

function generateEmail(){
    const domains = ["gmail.com","yahoo.com","yahoo.ir","mail.ir"];
    const name = firstNamesEn[Math.floor(Math.random()*firstNamesEn.length)].toLowerCase();
    const number = randomDigits(3);
    const domain = domains[Math.floor(Math.random()*domains.length)];
    return `${name}${number}@${domain}`;
}

function generatePassword(type="complex"){
    const simpleChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const complexChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    const chars = type==="simple"?simpleChars:complexChars;
    let pass = "";
    for(let i=0;i<10;i++) pass += chars[Math.floor(Math.random()*chars.length)];
    return pass;
}

function generateAddress(){
    let province = document.getElementById("province")?.value || "تهران";
    let city = document.getElementById("city")?.value || "تهران";
    let streets = ["مطهری","ولیعصر","انقلاب","ولیعصر","شهید بهشتی","آزادگان"];
    let number = randomDigits(2);
    let unit = randomDigits(1);
    let streetName = streets[Math.floor(Math.random()*streets.length)];
    let postal = generatePostal();
    return `${province}, ${city}, خیابان ${streetName}, پلاک ${number}, واحد ${unit}, ${postal}`;
}


function randomDigits(n){
    let s=""; for(let i=0;i<n;i++) s+=Math.floor(Math.random()*10); return s;
}

function calculateLuhn(number){
    let sum=0,alt=true;
    for(let i=number.length-1;i>=0;i--){
        let n=parseInt(number[i]);
        if(alt){ n*=2; if(n>9)n-=9; }
        sum+=n;
        alt=!alt;
    }
    return (10-(sum%10))%10;
}

function copyOutput(){
    let textarea=document.getElementById("output");
    textarea.select();
    document.execCommand("copy");
}
