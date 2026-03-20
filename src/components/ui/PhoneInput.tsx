'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, AlertCircle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Country data: name, dialCode, ISO2, minDigits, maxDigits (local number only)
   ──────────────────────────────────────────────────────────────────────────── */
export type Country = {
    name: string;
    dialCode: string;
    iso: string;
    flag: string;
    min: number; // min local digits
    max: number; // max local digits
};

export const COUNTRIES: Country[] = [
    { name: 'Afghanistan', dialCode: '+93', iso: 'AF', flag: '🇦🇫', min: 9, max: 9 },
    { name: 'Albania', dialCode: '+355', iso: 'AL', flag: '🇦🇱', min: 9, max: 9 },
    { name: 'Algeria', dialCode: '+213', iso: 'DZ', flag: '🇩🇿', min: 9, max: 9 },
    { name: 'Andorra', dialCode: '+376', iso: 'AD', flag: '🇦🇩', min: 6, max: 9 },
    { name: 'Angola', dialCode: '+244', iso: 'AO', flag: '🇦🇴', min: 9, max: 9 },
    { name: 'Argentina', dialCode: '+54', iso: 'AR', flag: '🇦🇷', min: 10, max: 11 },
    { name: 'Armenia', dialCode: '+374', iso: 'AM', flag: '🇦🇲', min: 8, max: 8 },
    { name: 'Australia', dialCode: '+61', iso: 'AU', flag: '🇦🇺', min: 9, max: 9 },
    { name: 'Austria', dialCode: '+43', iso: 'AT', flag: '🇦🇹', min: 10, max: 12 },
    { name: 'Azerbaijan', dialCode: '+994', iso: 'AZ', flag: '🇦🇿', min: 9, max: 9 },
    { name: 'Bahrain', dialCode: '+973', iso: 'BH', flag: '🇧🇭', min: 8, max: 8 },
    { name: 'Bangladesh', dialCode: '+880', iso: 'BD', flag: '🇧🇩', min: 10, max: 10 },
    { name: 'Belarus', dialCode: '+375', iso: 'BY', flag: '🇧🇾', min: 9, max: 10 },
    { name: 'Belgium', dialCode: '+32', iso: 'BE', flag: '🇧🇪', min: 9, max: 9 },
    { name: 'Bolivia', dialCode: '+591', iso: 'BO', flag: '🇧🇴', min: 8, max: 8 },
    { name: 'Bosnia & Herzegovina', dialCode: '+387', iso: 'BA', flag: '🇧🇦', min: 8, max: 9 },
    { name: 'Brazil', dialCode: '+55', iso: 'BR', flag: '🇧🇷', min: 10, max: 11 },
    { name: 'Brunei', dialCode: '+673', iso: 'BN', flag: '🇧🇳', min: 7, max: 7 },
    { name: 'Bulgaria', dialCode: '+359', iso: 'BG', flag: '🇧🇬', min: 9, max: 9 },
    { name: 'Cambodia', dialCode: '+855', iso: 'KH', flag: '🇰🇭', min: 8, max: 9 },
    { name: 'Cameroon', dialCode: '+237', iso: 'CM', flag: '🇨🇲', min: 9, max: 9 },
    { name: 'Canada', dialCode: '+1', iso: 'CA', flag: '🇨🇦', min: 10, max: 10 },
    { name: 'Chile', dialCode: '+56', iso: 'CL', flag: '🇨🇱', min: 9, max: 9 },
    { name: 'China', dialCode: '+86', iso: 'CN', flag: '🇨🇳', min: 11, max: 11 },
    { name: 'Colombia', dialCode: '+57', iso: 'CO', flag: '🇨🇴', min: 10, max: 10 },
    { name: 'Croatia', dialCode: '+385', iso: 'HR', flag: '🇭🇷', min: 8, max: 9 },
    { name: 'Cuba', dialCode: '+53', iso: 'CU', flag: '🇨🇺', min: 8, max: 8 },
    { name: 'Cyprus', dialCode: '+357', iso: 'CY', flag: '🇨🇾', min: 8, max: 8 },
    { name: 'Czech Republic', dialCode: '+420', iso: 'CZ', flag: '🇨🇿', min: 9, max: 9 },
    { name: 'Denmark', dialCode: '+45', iso: 'DK', flag: '🇩🇰', min: 8, max: 8 },
    { name: 'Ecuador', dialCode: '+593', iso: 'EC', flag: '🇪🇨', min: 9, max: 9 },
    { name: 'Egypt', dialCode: '+20', iso: 'EG', flag: '🇪🇬', min: 10, max: 10 },
    { name: 'Ethiopia', dialCode: '+251', iso: 'ET', flag: '🇪🇹', min: 9, max: 9 },
    { name: 'Finland', dialCode: '+358', iso: 'FI', flag: '🇫🇮', min: 9, max: 10 },
    { name: 'France', dialCode: '+33', iso: 'FR', flag: '🇫🇷', min: 9, max: 9 },
    { name: 'Georgia', dialCode: '+995', iso: 'GE', flag: '🇬🇪', min: 9, max: 9 },
    { name: 'Germany', dialCode: '+49', iso: 'DE', flag: '🇩🇪', min: 10, max: 11 },
    { name: 'Ghana', dialCode: '+233', iso: 'GH', flag: '🇬🇭', min: 9, max: 9 },
    { name: 'Greece', dialCode: '+30', iso: 'GR', flag: '🇬🇷', min: 10, max: 10 },
    { name: 'Guatemala', dialCode: '+502', iso: 'GT', flag: '🇬🇹', min: 8, max: 8 },
    { name: 'Hungary', dialCode: '+36', iso: 'HU', flag: '🇭🇺', min: 9, max: 9 },
    { name: 'Iceland', dialCode: '+354', iso: 'IS', flag: '🇮🇸', min: 7, max: 7 },
    { name: 'India', dialCode: '+91', iso: 'IN', flag: '🇮🇳', min: 10, max: 10 },
    { name: 'Indonesia', dialCode: '+62', iso: 'ID', flag: '🇮🇩', min: 9, max: 12 },
    { name: 'Iran', dialCode: '+98', iso: 'IR', flag: '🇮🇷', min: 10, max: 10 },
    { name: 'Iraq', dialCode: '+964', iso: 'IQ', flag: '🇮🇶', min: 10, max: 10 },
    { name: 'Ireland', dialCode: '+353', iso: 'IE', flag: '🇮🇪', min: 9, max: 9 },
    { name: 'Israel', dialCode: '+972', iso: 'IL', flag: '🇮🇱', min: 9, max: 9 },
    { name: 'Italy', dialCode: '+39', iso: 'IT', flag: '🇮🇹', min: 9, max: 10 },
    { name: 'Jamaica', dialCode: '+1876', iso: 'JM', flag: '🇯🇲', min: 7, max: 7 },
    { name: 'Japan', dialCode: '+81', iso: 'JP', flag: '🇯🇵', min: 10, max: 11 },
    { name: 'Jordan', dialCode: '+962', iso: 'JO', flag: '🇯🇴', min: 9, max: 9 },
    { name: 'Kazakhstan', dialCode: '+7', iso: 'KZ', flag: '🇰🇿', min: 10, max: 10 },
    { name: 'Kenya', dialCode: '+254', iso: 'KE', flag: '🇰🇪', min: 9, max: 9 },
    { name: 'Kuwait', dialCode: '+965', iso: 'KW', flag: '🇰🇼', min: 8, max: 8 },
    { name: 'Kyrgyzstan', dialCode: '+996', iso: 'KG', flag: '🇰🇬', min: 9, max: 9 },
    { name: 'Laos', dialCode: '+856', iso: 'LA', flag: '🇱🇦', min: 9, max: 10 },
    { name: 'Latvia', dialCode: '+371', iso: 'LV', flag: '🇱🇻', min: 8, max: 8 },
    { name: 'Lebanon', dialCode: '+961', iso: 'LB', flag: '🇱🇧', min: 7, max: 8 },
    { name: 'Libya', dialCode: '+218', iso: 'LY', flag: '🇱🇾', min: 9, max: 9 },
    { name: 'Lithuania', dialCode: '+370', iso: 'LT', flag: '🇱🇹', min: 8, max: 8 },
    { name: 'Luxembourg', dialCode: '+352', iso: 'LU', flag: '🇱🇺', min: 9, max: 11 },
    { name: 'Malaysia', dialCode: '+60', iso: 'MY', flag: '🇲🇾', min: 9, max: 10 },
    { name: 'Maldives', dialCode: '+960', iso: 'MV', flag: '🇲🇻', min: 7, max: 7 },
    { name: 'Malta', dialCode: '+356', iso: 'MT', flag: '🇲🇹', min: 8, max: 8 },
    { name: 'Mexico', dialCode: '+52', iso: 'MX', flag: '🇲🇽', min: 10, max: 10 },
    { name: 'Moldova', dialCode: '+373', iso: 'MD', flag: '🇲🇩', min: 8, max: 8 },
    { name: 'Mongolia', dialCode: '+976', iso: 'MN', flag: '🇲🇳', min: 8, max: 8 },
    { name: 'Morocco', dialCode: '+212', iso: 'MA', flag: '🇲🇦', min: 9, max: 9 },
    { name: 'Mozambique', dialCode: '+258', iso: 'MZ', flag: '🇲🇿', min: 9, max: 9 },
    { name: 'Myanmar', dialCode: '+95', iso: 'MM', flag: '🇲🇲', min: 8, max: 10 },
    { name: 'Nepal', dialCode: '+977', iso: 'NP', flag: '🇳🇵', min: 10, max: 10 },
    { name: 'Netherlands', dialCode: '+31', iso: 'NL', flag: '🇳🇱', min: 9, max: 9 },
    { name: 'New Zealand', dialCode: '+64', iso: 'NZ', flag: '🇳🇿', min: 8, max: 9 },
    { name: 'Nigeria', dialCode: '+234', iso: 'NG', flag: '🇳🇬', min: 10, max: 10 },
    { name: 'North Korea', dialCode: '+850', iso: 'KP', flag: '🇰🇵', min: 9, max: 10 },
    { name: 'Norway', dialCode: '+47', iso: 'NO', flag: '🇳🇴', min: 8, max: 8 },
    { name: 'Oman', dialCode: '+968', iso: 'OM', flag: '🇴🇲', min: 8, max: 8 },
    { name: 'Pakistan', dialCode: '+92', iso: 'PK', flag: '🇵🇰', min: 10, max: 10 },
    { name: 'Palestine', dialCode: '+970', iso: 'PS', flag: '🇵🇸', min: 9, max: 9 },
    { name: 'Panama', dialCode: '+507', iso: 'PA', flag: '🇵🇦', min: 8, max: 8 },
    { name: 'Paraguay', dialCode: '+595', iso: 'PY', flag: '🇵🇾', min: 9, max: 9 },
    { name: 'Peru', dialCode: '+51', iso: 'PE', flag: '🇵🇪', min: 9, max: 9 },
    { name: 'Philippines', dialCode: '+63', iso: 'PH', flag: '🇵🇭', min: 10, max: 10 },
    { name: 'Poland', dialCode: '+48', iso: 'PL', flag: '🇵🇱', min: 9, max: 9 },
    { name: 'Portugal', dialCode: '+351', iso: 'PT', flag: '🇵🇹', min: 9, max: 9 },
    { name: 'Qatar', dialCode: '+974', iso: 'QA', flag: '🇶🇦', min: 8, max: 8 },
    { name: 'Romania', dialCode: '+40', iso: 'RO', flag: '🇷🇴', min: 9, max: 9 },
    { name: 'Russia', dialCode: '+7', iso: 'RU', flag: '🇷🇺', min: 10, max: 10 },
    { name: 'Saudi Arabia', dialCode: '+966', iso: 'SA', flag: '🇸🇦', min: 9, max: 9 },
    { name: 'Senegal', dialCode: '+221', iso: 'SN', flag: '🇸🇳', min: 9, max: 9 },
    { name: 'Serbia', dialCode: '+381', iso: 'RS', flag: '🇷🇸', min: 8, max: 9 },
    { name: 'Singapore', dialCode: '+65', iso: 'SG', flag: '🇸🇬', min: 8, max: 8 },
    { name: 'Slovakia', dialCode: '+421', iso: 'SK', flag: '🇸🇰', min: 9, max: 9 },
    { name: 'Slovenia', dialCode: '+386', iso: 'SI', flag: '🇸🇮', min: 8, max: 8 },
    { name: 'Somalia', dialCode: '+252', iso: 'SO', flag: '🇸🇴', min: 8, max: 9 },
    { name: 'South Africa', dialCode: '+27', iso: 'ZA', flag: '🇿🇦', min: 9, max: 9 },
    { name: 'South Korea', dialCode: '+82', iso: 'KR', flag: '🇰🇷', min: 9, max: 10 },
    { name: 'Spain', dialCode: '+34', iso: 'ES', flag: '🇪🇸', min: 9, max: 9 },
    { name: 'Sri Lanka', dialCode: '+94', iso: 'LK', flag: '🇱🇰', min: 9, max: 9 },
    { name: 'Sudan', dialCode: '+249', iso: 'SD', flag: '🇸🇩', min: 9, max: 9 },
    { name: 'Sweden', dialCode: '+46', iso: 'SE', flag: '🇸🇪', min: 9, max: 10 },
    { name: 'Switzerland', dialCode: '+41', iso: 'CH', flag: '🇨🇭', min: 9, max: 9 },
    { name: 'Syria', dialCode: '+963', iso: 'SY', flag: '🇸🇾', min: 9, max: 9 },
    { name: 'Taiwan', dialCode: '+886', iso: 'TW', flag: '🇹🇼', min: 9, max: 9 },
    { name: 'Tajikistan', dialCode: '+992', iso: 'TJ', flag: '🇹🇯', min: 9, max: 9 },
    { name: 'Tanzania', dialCode: '+255', iso: 'TZ', flag: '🇹🇿', min: 9, max: 9 },
    { name: 'Thailand', dialCode: '+66', iso: 'TH', flag: '🇹🇭', min: 9, max: 9 },
    { name: 'Tunisia', dialCode: '+216', iso: 'TN', flag: '🇹🇳', min: 8, max: 8 },
    { name: 'Turkey', dialCode: '+90', iso: 'TR', flag: '🇹🇷', min: 10, max: 10 },
    { name: 'Turkmenistan', dialCode: '+993', iso: 'TM', flag: '🇹🇲', min: 8, max: 8 },
    { name: 'Uganda', dialCode: '+256', iso: 'UG', flag: '🇺🇬', min: 9, max: 9 },
    { name: 'Ukraine', dialCode: '+380', iso: 'UA', flag: '🇺🇦', min: 9, max: 9 },
    { name: 'United Arab Emirates', dialCode: '+971', iso: 'AE', flag: '🇦🇪', min: 9, max: 9 },
    { name: 'United Kingdom', dialCode: '+44', iso: 'GB', flag: '🇬🇧', min: 10, max: 10 },
    { name: 'United States', dialCode: '+1', iso: 'US', flag: '🇺🇸', min: 10, max: 10 },
    { name: 'Uruguay', dialCode: '+598', iso: 'UY', flag: '🇺🇾', min: 9, max: 9 },
    { name: 'Uzbekistan', dialCode: '+998', iso: 'UZ', flag: '🇺🇿', min: 9, max: 9 },
    { name: 'Venezuela', dialCode: '+58', iso: 'VE', flag: '🇻🇪', min: 10, max: 10 },
    { name: 'Vietnam', dialCode: '+84', iso: 'VN', flag: '🇻🇳', min: 9, max: 10 },
    { name: 'Yemen', dialCode: '+967', iso: 'YE', flag: '🇾🇪', min: 9, max: 9 },
    { name: 'Zimbabwe', dialCode: '+263', iso: 'ZW', flag: '🇿🇼', min: 9, max: 9 },
];

// Default to India
const DEFAULT_COUNTRY = COUNTRIES.find(c => c.iso === 'IN')!;

type Props = {
    /** className applied to the outer wrapper */
    className?: string;
    /** Label text */
    labelClassName?: string;
    /** The size variant */
    size?: 'sm' | 'md';
    /** Whether to show an inline validation error immediately on blur */
    validateOnBlur?: boolean;
    /** called whenever the combined value changes, e.g. for parent error clearing */
    onChange?: () => void;
};

export default function PhoneInput({
    className = '',
    labelClassName = '',
    size = 'md',
    validateOnBlur = true,
    onChange,
}: Props) {
    const [selected, setSelected] = useState<Country>(DEFAULT_COUNTRY);
    const [digits, setDigits] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Combined value stored in a hidden input named "phone"
    const fullValue = digits.trim() ? `${selected.dialCode}${digits.trim()}` : '';

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Focus search when dropdown opens
    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50);
    }, [open]);

    const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search) ||
        c.iso.toLowerCase().includes(search.toLowerCase())
    );

    function validate(value: string) {
        const len = value.replace(/\D/g, '').length;
        if (!value) return 'Phone number is required.';
        if (len < selected.min) return `Too short — ${selected.name} numbers need at least ${selected.min} digits.`;
        if (len > selected.max) return `Too long — ${selected.name} numbers have at most ${selected.max} digits.`;
        return '';
    }

    function handleDigitsChange(e: React.ChangeEvent<HTMLInputElement>) {
        // Only allow digits, spaces, hyphens, parentheses
        const v = e.target.value.replace(/[^\d\s\-()]/g, '');
        setDigits(v);
        if (touched) setError(validate(v));
        if (onChange) onChange();
    }

    function handleBlur() {
        setTouched(true);
        if (validateOnBlur) setError(validate(digits));
    }

    function selectCountry(c: Country) {
        setSelected(c);
        setOpen(false);
        setSearch('');
        if (touched && digits) setError(validate(digits));
    }

    const py = size === 'sm' ? 'py-2.5' : 'py-3.5';
    const px = size === 'sm' ? 'px-3' : 'px-4';
    const textSize = size === 'sm' ? 'text-sm' : 'text-base';

    return (
        <div className={`w-full ${className}`}>
            <label className={`block text-sm font-medium text-brand-deeper-teal mb-1.5 ${labelClassName}`}>
                Phone Number
            </label>

            {/* Input row */}
            <div className={`flex gap-0 rounded-xl overflow-visible border-2 transition-all ${error && touched ? 'border-red-400 ring-2 ring-red-100' : 'border-transparent ring-0 focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/20'}`}>

                {/* Country selector trigger */}
                <div ref={dropdownRef} className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        className={`flex items-center gap-1.5 bg-brand-light ${py} pl-3 pr-2 rounded-l-xl border-0 outline-none h-full cursor-pointer hover:bg-gray-200/70 transition-colors ${textSize}`}
                        aria-label="Select country code"
                    >
                        <span className="text-lg leading-none">{selected.flag}</span>
                        <span className="font-mono font-semibold text-gray-700 text-xs">{selected.dialCode}</span>
                        <ChevronDown size={12} className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute top-full left-0 mt-1 z-[200] w-72 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
                            {/* Search */}
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                                <Search size={14} className="text-gray-400 shrink-0" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search country or code..."
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                            {/* List */}
                            <ul className="max-h-52 overflow-y-auto" role="listbox">
                                {filtered.length === 0 ? (
                                    <li className="px-4 py-3 text-sm text-gray-500">No countries found</li>
                                ) : (
                                    filtered.map(c => (
                                        <li key={c.iso}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={c.iso === selected.iso}
                                                onClick={() => selectCountry(c)}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-light transition-colors text-left ${c.iso === selected.iso ? 'bg-brand-light font-semibold text-brand-deeper-teal' : 'text-gray-700'}`}
                                            >
                                                <span className="text-base shrink-0">{c.flag}</span>
                                                <span className="flex-1 truncate">{c.name}</span>
                                                <span className="text-xs font-mono text-gray-500 shrink-0">{c.dialCode}</span>
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-200 self-stretch" />

                {/* Number input */}
                <input
                    type="tel"
                    value={digits}
                    onChange={handleDigitsChange}
                    onBlur={handleBlur}
                    placeholder={selected.min === selected.max ? `${selected.min} digits` : `${selected.min}–${selected.max} digits`}
                    inputMode="numeric"
                    className={`flex-1 bg-brand-light border-0 ${px} ${py} rounded-r-xl outline-none transition-all ${textSize} placeholder:text-foreground/40`}
                />
            </div>

            {/* Hidden input carries the full value for FormData */}
            <input type="hidden" name="phone" value={fullValue} />

            {/* Validation hint */}
            {touched && error ? (
                <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600 font-medium">
                    <AlertCircle size={13} className="shrink-0" />
                    {error}
                </p>
            ) : touched && !error && digits ? (
                <p className="mt-1.5 text-xs text-green-600 font-medium">✓ Looks good!</p>
            ) : (
                <p className="mt-1 text-[11px] text-gray-400">
                    {selected.name}: {selected.min}{selected.min !== selected.max ? `–${selected.max}` : ''} digit{selected.max !== 1 ? 's' : ''}
                </p>
            )}
        </div>
    );
}

/** Returns a validate function for a given country — useful for form-level pre-submit check */
export function validatePhone(dialCode: string, digits: string): string {
    const country = COUNTRIES.find(c => c.dialCode === dialCode) ?? DEFAULT_COUNTRY;
    const len = digits.replace(/\D/g, '').length;
    if (!digits.trim()) return 'Phone number is required.';
    if (len < country.min) return `Too short — ${country.name} numbers need at least ${country.min} digits.`;
    if (len > country.max) return `Too long — ${country.name} numbers have at most ${country.max} digits.`;
    return '';
}
