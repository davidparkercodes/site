export interface PasswordConfig {
  password: string;
  identifier: string;
  description?: string;
}

export const passwordConfigs: PasswordConfig[] = [
  { password: "aaa", identifier: "test", description: "Test Access" }
];

export function validatePassword(input: string): PasswordConfig | null {
  const normalizedInput = input.toLowerCase().trim();
  return passwordConfigs.find(config => 
    config.password.toLowerCase() === normalizedInput
  ) || null;
}

export function trackPasswordUsage(identifier: string): void {
  if (typeof window === 'undefined') return;
  
  const storageKey = 'password_usage_tracking';
  const existingData = localStorage.getItem(storageKey);
  const tracking = existingData ? JSON.parse(existingData) : {};
  
  if (!tracking[identifier]) {
    tracking[identifier] = {
      firstAccess: new Date().toISOString(),
      accessCount: 0,
      lastAccess: null
    };
  }
  
  tracking[identifier].accessCount++;
  tracking[identifier].lastAccess = new Date().toISOString();
  
  localStorage.setItem(storageKey, JSON.stringify(tracking));
  
  console.log(`Access tracked for: ${identifier}`);
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const authData = localStorage.getItem('site_auth');
  if (!authData) return false;
  
  try {
    const auth = JSON.parse(authData);
    const expirationTime = new Date(auth.expiration).getTime();
    const now = new Date().getTime();
    
    return now < expirationTime;
  } catch {
    return false;
  }
}

export function setAuthentication(config: PasswordConfig): void {
  if (typeof window === 'undefined') return;
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  
  const authData = {
    identifier: config.identifier,
    description: config.description,
    authenticatedAt: new Date().toISOString(),
    expiration: expirationDate.toISOString()
  };
  
  localStorage.setItem('site_auth', JSON.stringify(authData));
  trackPasswordUsage(config.identifier);
}

export function clearAuthentication(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('site_auth');
}

export function getAuthenticationInfo(): any {
  if (typeof window === 'undefined') return null;
  
  const authData = localStorage.getItem('site_auth');
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
}
