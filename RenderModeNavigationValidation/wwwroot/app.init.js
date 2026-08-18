// JavaScript initializer for Render Mode Navigation Validation
// This file ensures metadata comments are properly handled during enhanced navigation
// Issue: https://github.com/dotnet/aspnetcore/issues/68516

export async function beforeStart(options, extensions) {
    console.log('[Blazor] Render Mode Navigation Validation initializer loaded');
    
    // Track navigation events for validation
    window.navigationValidationState = {
        navigationCount: 0,
        lastError: null,
        metadata: {
            hasWebAssemblyComment: false,
            hasServerStateComment: false,
            hasInitializersComment: false
        }
    };

    // Scan for Blazor metadata comments
    const html = document.documentElement.innerHTML;
    window.navigationValidationState.metadata.hasWebAssemblyComment = /<!--Blazor-WebAssembly:/.test(html);
    window.navigationValidationState.metadata.hasServerStateComment = /<!--Blazor-Server-Component-State:/.test(html) || /<!--Blazor-WebAssembly-Component-State:/.test(html);
    window.navigationValidationState.metadata.hasInitializersComment = /<!--Blazor-Web-Initializers:/.test(html);
    
    console.log('[Blazor] Metadata comments detected:', window.navigationValidationState.metadata);
}

export async function afterStarted(blazor) {
    console.log('[Blazor] Render Mode Navigation Validation: App started successfully');
    
    // Monitor for insertBefore errors during navigation
    const originalInsertBefore = Element.prototype.insertBefore;
    Element.prototype.insertBefore = function(newNode, refNode) {
        try {
            return originalInsertBefore.call(this, newNode, refNode);
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
