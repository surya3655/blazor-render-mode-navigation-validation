export function beforeWebStart() {
    window.navigationValidationState = {
        navigationCount: 0,
        lastError: null,
        metadata: {
            hasWebAssemblyComment: false,
            hasServerStateComment: false,
            hasInitializersComment: false
        }
    };

    const html = document.documentElement.innerHTML;
    window.navigationValidationState.metadata.hasWebAssemblyComment = /<!--Blazor-WebAssembly:/.test(html);
    window.navigationValidationState.metadata.hasServerStateComment = /<!--Blazor-Server-Component-State:/.test(html)
        || /<!--Blazor-WebAssembly-Component-State:/.test(html);
    window.navigationValidationState.metadata.hasInitializersComment = /<!--Blazor-Web-Initializers:/.test(html);

    console.log('[Blazor Validation] Metadata comments detected:', window.navigationValidationState.metadata);
}

export function afterWebStarted() {
    console.log('[Blazor Validation] App started successfully');

    const originalInsertBefore = Element.prototype.insertBefore;
    Element.prototype.insertBefore = function(newNode, referenceNode) {
        try {
            return originalInsertBefore.call(this, newNode, referenceNode);
        } catch (error) {
            if (error.message.includes('insertBefore')) {
                console.error('[Blazor Validation] insertBefore error detected:', error);
                window.navigationValidationState.lastError = {
                    message: error.message,
                    timestamp: new Date().toISOString(),
                    stack: error.stack
                };
            }
            throw error;
        }
    };
}