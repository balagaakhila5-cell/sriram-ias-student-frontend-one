import{j as e,R as g}from"./index-FOwXK0BM.js";import{u}from"./navigation-DyL9qzwr.js";const b="/assets/course/confirmed-bag.png",m=t=>t.toLocaleString("en-IN");function v(t){const{receiptNo:a,customerName:l="Customer",customerId:d="STU767678",paymentDate:n,detailLabel:r="Order Details",detailValue:x,rows:o,totalPaid:c}=t,f=o.map(i=>`
      <span>${i.label}</span>
      <span class="right">${i.isDiscount?"- ":""}Rs.${m(i.amount)}</span>
    `).join("");return`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { margin: 0; padding: 30px; font-family: Arial, sans-serif; background: #ffffff; color: #000000; }
          .receipt { max-width: 850px; margin: 0 auto; border: 1px solid #e5e7eb; }
          .header { background: #1e3f6d; color: white; padding: 20px 35px; display: flex; justify-content: space-between; }
          .header h2, .header p { margin: 0; }
          .info { padding: 30px 35px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
          .full { grid-column: span 3; }
          .label { color: #777; font-size: 15px; margin-bottom: 8px; }
          .value { font-weight: 700; font-size: 16px; }
          .row-head, .total { background: #e7eefc; display: grid; grid-template-columns: 1fr 180px; padding: 16px 35px; font-weight: 700; }
          .rows { display: grid; grid-template-columns: 1fr 180px; gap: 16px; padding: 24px 35px; font-weight: 700; }
          .right { text-align: right; }
          .note { text-align: center; padding: 22px; font-size: 15px; }
          @media print { body { padding: 0; } .receipt { border: none; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div>
              <h2>Financial Receipt</h2>
              <p style="margin-top: 8px; font-weight: 700;">SRIRAM's IAS</p>
            </div>
            <div>
              <p style="opacity: 0.75;">Receipt No :</p>
              <p style="margin-top: 8px; font-weight: 700;">${a}</p>
            </div>
          </div>
          <div class="info">
            <div><div class="label">Student Name</div><div class="value">${l}</div></div>
            <div><div class="label">Student ID</div><div class="value">${d}</div></div>
            <div><div class="label">Payment Date</div><div class="value">${n}</div></div>
            <div class="full"><div class="label">${r}</div><div class="value">${x}</div></div>
          </div>
          <div class="row-head"><span>Description</span><span class="right">Amount</span></div>
          <div class="rows">${f}</div>
          <div class="total"><span>Total Paid</span><span class="right">Rs.${m(c)}</span></div>
          <div class="note">This is a system generated document and does not require<br />signature</div>
        </div>
        <script>window.onload = function () { window.print(); };<\/script>
      </body>
    </html>
  `}function y({receiptNo:t,customerName:a="Customer",customerId:l="STU767678",paymentDate:d,detailLabel:n="Order Details",detailValue:r,rows:x,totalPaid:o,onGoHome:c}){const f=u(),i=()=>{if(c){c();return}f.push("/")},h=()=>{const s=window.open("","_blank","width=900,height=900");s&&(s.document.write(v({receiptNo:t,customerName:a,customerId:l,paymentDate:d,detailLabel:n,detailValue:r,rows:x,totalPaid:o})),s.document.close())};return e.jsx("div",{className:"w-full font-['Montserrat',sans-serif]",style:{background:"linear-gradient(115deg, #fffdf8 0%, #fff9ed 45%, #fff2d5 100%)"},children:e.jsx("div",{className:"min-h-[calc(100vh-140px)] px-6 py-6 md:px-10 md:py-8",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between xl:px-4",children:[e.jsxs("div",{className:"flex flex-col items-start mt-4 lg:mt-10 lg:max-w-[580px]",children:[e.jsxs("div",{className:"mb-6 flex items-center gap-3",children:[e.jsx("div",{className:"flex h-11 w-11 items-center justify-center rounded-full border border-[#00b814] text-[28px] text-[#00b814]",children:"✓"}),e.jsx("h1",{className:"text-[28px] font-extrabold text-[#00b814]",children:"Admission Confirmed"})]}),e.jsx("p",{className:"mb-6 max-w-[520px] text-[17px] font-medium leading-[1.6] text-black",children:"Thank you for the payment  the order of service and the payment is received and you will get a confirmation mail"}),e.jsx("img",{src:b,alt:"Order Confirmed",className:"mb-8 h-[220px] w-[300px] object-contain md:h-[250px] md:w-[340px] lg:h-[270px] lg:w-[360px]"}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-5",children:[e.jsx("button",{type:"button",onClick:h,className:"h-[40px] cursor-pointer rounded-[7px] px-6 text-[15px] font-semibold text-white",style:{background:"linear-gradient(90deg, #43a8da 0%, #003247 100%)"},children:"Download Invoice"}),e.jsx("button",{type:"button",onClick:i,className:"h-[40px] cursor-pointer rounded-[7px] border border-[#1a85bb] bg-white px-10 text-[15px] font-semibold text-[#1a85bb]",children:"Go Home"})]})]}),e.jsxs("div",{className:"w-full max-w-[640px] shrink-0 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] lg:ml-auto",children:[e.jsxs("div",{className:"flex items-start justify-between bg-[#1e3f6d] px-6 py-5 text-white md:px-10",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-[18px] font-bold",children:"Financial Receipt"}),e.jsx("p",{className:"mt-2 text-[17px] font-extrabold",children:"SRIRAM's IAS"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white/70",children:"Receipt No :"}),e.jsx("p",{className:"mt-2 text-[17px] font-extrabold",children:t})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3 md:px-10",children:[e.jsx(p,{label:"Student Name",value:a}),e.jsx(p,{label:"Student ID",value:l}),e.jsx(p,{label:"Payment Date",value:d}),e.jsx("div",{className:"sm:col-span-3",children:e.jsx(p,{label:n,value:r})})]}),e.jsxs("div",{className:"grid grid-cols-[1fr_180px] bg-[#e7eefc] px-6 py-4 md:px-10",children:[e.jsx("span",{className:"text-[17px] font-bold text-[#5c6170]",children:"Description"}),e.jsx("span",{className:"text-right text-[17px] font-bold text-[#5c6170]",children:"Amount"})]}),e.jsx("div",{className:"grid grid-cols-[1fr_180px] gap-y-5 px-6 py-6 md:px-10",children:x.map(s=>e.jsxs(g.Fragment,{children:[e.jsx("span",{className:"text-[17px] font-extrabold text-black",children:s.label}),e.jsxs("span",{className:"text-right text-[17px] font-extrabold text-black",children:[s.isDiscount?"- ":"","Rs.",m(s.amount)]})]},s.label))}),e.jsxs("div",{className:"grid grid-cols-[1fr_180px] bg-[#e7eefc] px-6 py-5 md:px-10",children:[e.jsx("span",{className:"text-[17px] font-extrabold text-black",children:"Total Paid"}),e.jsxs("span",{className:"text-right text-[17px] font-extrabold text-black",children:["Rs.",m(o)]})]}),e.jsxs("div",{className:"px-6 py-5 text-center text-[17px] font-medium leading-[1.5] text-black md:px-10",children:["This is a system generated document and does not require",e.jsx("br",{}),"signature"]})]})]})})})}function p({label:t,value:a}){return e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-[#777]",children:t}),e.jsx("p",{className:"mt-3 text-[17px] font-extrabold text-black",children:a})]})}export{y as P};
