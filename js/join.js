import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById('join-form');
const successMsg = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');

form && form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    college: form.college.value.trim(),
    branch: form.branch.value,
    year: form.year.value,
    paymentStatus: 'pending',
    createdAt: serverTimestamp()
  };


  if (!data.name || !data.email || !data.phone) {
    showError('xxxs.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  try {
    const docRef = await addDoc(collection(db, 'members'), data);
    console.log('Member registered:', docRef.id);

    
    form.style.display = 'none';
    successMsg.style.display = 'block';

    
    setTimeout(() => {
    
      alert('Redirect to payment of ₹250. Integration point for Razorpay/PayU.');
    }, 1500);

  } catch (err) {
    console.error('Error:', err);
    showError('Something went wrong. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Complete Registration & Pay ₹250';
  }
});

function showError(msg) {
  let el = document.getElementById('form-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'form-error';
    el.style.cssText = 'color:#f87171;font-size:0.82rem;margin-top:12px;text-align:center;';
    submitBtn.after(el);
  }
  el.textContent = msg;
}
