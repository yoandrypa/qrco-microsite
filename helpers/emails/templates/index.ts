export const NEW_DONATION_REVIEW_HTML = (
  micrositeUrl: string,
  donnerName: string = 'Anonymous',
  donnerMessage: string,
  checkoutsUrl: string

) => {
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    </head>
    <body>      
    </body>
    </html>
    <head>
      <style>
        .action-button
    {
        position: relative;
        padding: 10px 40px;
      margin: 0px 10px 10px 0px;
      float: left;
        border-radius: 3px;
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        color: #FFF;
        text-decoration: none;	
    }    
     .button {
      background-color: rgba(43, 43, 236, 0.964); /* Blue */
      font-family: sans-serif;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 10px;
      margin: 0 auto; /* Added to center the button */
    }
    
    .ripple {
      background-position: center;
      transition: background 0.8s;
    }
    .ripple:hover {
      background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
    }
    .ripple:active {
      background-color: #6eb9f7;
      background-size: 100%;
      transition: background 0s;
    }
    
    .container-centered {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
    }
    .review-card {
        box-shadow: 2 2 ;
        border-radius: 8px;
        border: 2px;
        max-width: 600px;
        margin-top: 12px;
    }
    .card {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      border-radius: 5px; /* 5px rounded corners */
      margin: 10px;
      max-width: 600;  
    }
    
    /* On mouse-over, add a deeper shadow */
    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    
    /* Add some padding inside the card container */
    .container {
      padding: 2px 16px;
    }
    
    .gray-footer {
      background-color: lightgray;
      margin: 10px 0px
    }
    
    h1 h4 {
        font-family:'Roboto', sans-serif;
    }
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
      </style>
    </head>
    <body>
    <main>
    <div >
        <p style="margin: 10px">
            Hi, we wanted to let you know that you received
            a new message from one of your supporters on your
           <span><a href="${micrositeUrl}">donation microsite</a></span>. Thank you for taking the time 
            to connect with others in our community.
            Please do not respond to this mail. If you would like to view the details you can log into
            your account dashboard  and access your checkouts. You can use the button bellow. Thank you again for your support.
        </p>    
    <div class="review-card">
    <div class="card">   
        <div class="container">
          <h4><b>${donnerName} left you a message</b></h4>
          <p>
           ${donnerMessage}
          </p>
        </div>
      </div>
    </div>
    <div class="container-centered">
        <a href="${checkoutsUrl}" target="_blank" class="button action-button ripple" style="margin-top: 3rem;">Open Dashboard</a>
    </div>
    <p>Best regards,</p>
    <p>The QR Link team</p>
    </main>
    <footer>
      <div class="container-centered gray-footer" style="margin-top: 3rem">
        <p>
          This is a just a notification. Please do not reply to this email. For more information please reach us at <a href="mailto:info@ebanux.com">info@ebanux.com</a>
        </p>
     </div>    
    </div>
    </footer>    
    </body>
    </html>    
    `;
}

export const NEW_DONATION_REVIEW_PLAIN = (
  micrositeUrl: string,
  donnerName: string = 'Anonymous',
  donnerMessage: string,
  checkoutsUrl: string

) => {
  `Hi, we wanted to let you know that you received a new message from one of your supporters on your microsite: 
  ${micrositeUrl} \n
  ${donnerName || 'An Anonymous user'} left you a message:\n
  ${donnerMessage}\n\n
  Thank you for taking the time to connect with others in our community. Please do not respond to this email. 
  If you would like to view the details of the donation you can log into
  your account dashboard  and access your checkouts. You can use the link bellow. Thank you again for your support.
  ` + checkoutsUrl +
    `\n
  This is a just a notification. Please do not reply to this email. For more information please reach us at info@ebanux.com`
}