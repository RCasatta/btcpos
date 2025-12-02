// state.ts - Application state management

import * as lwk from "lwk_wasm"

/**
 * Private state object containing all application state
 */
const _state: {
    pricesFetcher: lwk.PricesFetcher | null;
    wollet: lwk.Wollet | null;
    currencyCode: lwk.CurrencyCode | null;
    boltzSession: lwk.BoltzSession | null;
} = {
    // Prices fetcher for exchange rates
    pricesFetcher: null,

    // Wallet state
    wollet: null,

    // Currency code (e.g., "USD", "EUR", "CHF")
    currencyCode: null,

    // Boltz session for lightning swaps
    boltzSession: null,
};

/**
 * Subscribers for state changes
 */
const _subscribers = new Map<string, Set<(data: any) => void>>();

/**
 * Subscribe to state changes
 * @param eventName - Name of the event to subscribe to
 * @param callback - Function to call when event is triggered
 * @returns Unsubscribe function
 */
export function subscribe(eventName: string, callback: (data: any) => void): () => void {
    if (!_subscribers.has(eventName)) {
        _subscribers.set(eventName, new Set());
    }
    _subscribers.get(eventName)!.add(callback);

    // Return unsubscribe function
    return () => {
        const subscribers = _subscribers.get(eventName);
        if (subscribers) {
            subscribers.delete(callback);
        }
    };
}

/**
 * Publish an event
 * @param eventName - Name of the event to publish
 * @param data - Data to pass to subscribers
 */
export function publish(eventName: string, data: any): void {
    const subscribers = _subscribers.get(eventName);
    if (subscribers) {
        subscribers.forEach(callback => callback(data));
    }
}

// PricesFetcher state management
export function getPricesFetcher(): lwk.PricesFetcher | null {
    return _state.pricesFetcher;
}

export function setPricesFetcher(pricesFetcher: lwk.PricesFetcher | null): lwk.PricesFetcher | null {
    _state.pricesFetcher = pricesFetcher;
    publish('prices-fetcher-changed', pricesFetcher);
    return _state.pricesFetcher;
}

// Wollet state management
export function getWollet(): lwk.Wollet | null {
    return _state.wollet;
}

export function setWollet(wollet: lwk.Wollet | null): lwk.Wollet | null {
    _state.wollet = wollet;
    publish('wollet-changed', wollet);
    return _state.wollet;
}

// Currency code state management
export function getCurrencyCode(): lwk.CurrencyCode | null {
    return _state.currencyCode;
}

export function setCurrencyCode(currencyCode: lwk.CurrencyCode | null): lwk.CurrencyCode | null {
    _state.currencyCode = currencyCode;
    publish('currency-code-changed', currencyCode);
    return _state.currencyCode;
}

// BoltzSession state management
export function getBoltzSession(): lwk.BoltzSession | null {
    return _state.boltzSession;
}

export function setBoltzSession(boltzSession: lwk.BoltzSession | null): lwk.BoltzSession | null {
    _state.boltzSession = boltzSession;
    publish('boltz-session-changed', boltzSession);
    return _state.boltzSession;
}

