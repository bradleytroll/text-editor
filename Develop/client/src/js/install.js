const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed';
    
    
    // if (deferredPrompt) {
    //     deferredPrompt.prompt();
    //     const { outcome } = await deferredPrompt.userChoice;
    //     console.log(`User response to the install prompt: ${outcome}`);
    //     deferredPrompt = null;
    //   }
    //   butInstall.style.display = 'none';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Installation successful');
    //deferredPrompt = null;
});
