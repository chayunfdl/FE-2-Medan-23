const ENVIRONMENT = window.location.protocol === 'https:' ? 'production' : 'development'
const API_URL = 'http://dimaspadma.my.id:3000';

const containerElement = document.getElementById('container')

function openTabs(evt, tabName) {
  const tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  const tabLinks = document.querySelectorAll('.tablinks');
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = 'flex';
  evt.currentTarget.className += ' active';
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

const getAllMenu = () => {
  // Fetch all orders
  fetch(API_URL + '/orders')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return response.json();
    })
    .then(data => {
      console.log('All orders:', data.data);
      // Handle the data as needed
    })
    .catch(error => console.error('Error fetching orders:', error.message));
}

$("#order").on('click', () => {
  const _confirm = confirm('Terimakasih kami akan mengirimkan email kepada anda ketika pesanan sudah siap');

  if (!_confirm) return;

  const name = $("input[name=name]").val()
  const email = $("input[name=email]").val()
  const order = $("input[name=order]").val()

  // Add an order
  const orderDetails = {
    name,
    email,
    order,
  };

  fetch(API_URL + '/orders/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderDetails),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      return response.json();
    })
    .then(data => {
      console.log('Order placed successfully:', data);
      // Handle the data as needed
      alert("Order placed successfully")
    })
    .catch(error => console.error('Error placing order:', error.message));
})