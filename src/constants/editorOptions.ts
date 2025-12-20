import type { SupportedLanguage, SupportedThemes } from '../components/editor/editor.types';

export const LANGUAGES: SupportedLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'json',
  'N1QL',
  'SqlPlusPlus',
  'shell',
  'text',
];

export const THEMES: Array<{ value: SupportedThemes; label: string }> = [
  { value: 'vs-dark', label: 'Dark Theme' },
  { value: 'vs-light', label: 'Light Theme' },
];

export const WORD_WRAP_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'on', label: 'On' },
  { value: 'wordWrapColumn', label: 'Word Wrap Column' },
  { value: 'bounded', label: 'Bounded' },
] as const;

export const CURSOR_STYLE_OPTIONS = [
  { value: 'line', label: 'Line' },
  { value: 'block', label: 'Block' },
  { value: 'underline', label: 'Underline' },
  { value: 'line-thin', label: 'Line Thin' },
  { value: 'block-outline', label: 'Block Outline' },
  { value: 'underline-thin', label: 'Underline Thin' },
] as const;

export const LINE_NUMBERS_OPTIONS = [
  { value: 'on', label: 'On (Absolute)' },
  { value: 'relative', label: 'Relative' },
  { value: 'off', label: 'Off' },
] as const;

export const RENDER_WHITESPACE_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'boundary', label: 'Boundary' },
  { value: 'selection', label: 'Selection' },
  { value: 'all', label: 'All' },
] as const;

export const RENDER_LINE_HIGHLIGHT_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'gutter', label: 'Gutter Only' },
  { value: 'line', label: 'Line Only' },
  { value: 'all', label: 'All (Gutter + Line)' },
] as const;

export const CURSOR_BLINKING_OPTIONS = [
  { value: 'blink', label: 'Blink' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'phase', label: 'Phase' },
  { value: 'expand', label: 'Expand' },
  { value: 'solid', label: 'Solid (No Blink)' },
] as const;

export const CURSOR_SMOOTH_CARET_ANIMATION_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'explicit', label: 'Explicit' },
  { value: 'on', label: 'On' },
] as const;

export const AUTO_INDENT_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'keep', label: 'Keep' },
  { value: 'brackets', label: 'Brackets' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'full', label: 'Full' },
] as const;

export const AUTO_CLOSING_BRACKETS_OPTIONS = [
  { value: 'always', label: 'Always' },
  { value: 'languageDefined', label: 'Language Defined' },
  { value: 'beforeWhitespace', label: 'Before Whitespace' },
  { value: 'never', label: 'Never' },
] as const;

export const AUTO_CLOSING_QUOTES_OPTIONS = [
  { value: 'always', label: 'Always' },
  { value: 'languageDefined', label: 'Language Defined' },
  { value: 'beforeWhitespace', label: 'Before Whitespace' },
  { value: 'never', label: 'Never' },
] as const;

export const AUTO_SURROUND_OPTIONS = [
  { value: 'languageDefined', label: 'Language Defined' },
  { value: 'quotes', label: 'Quotes Only' },
  { value: 'brackets', label: 'Brackets Only' },
  { value: 'never', label: 'Never' },
] as const;

export const ACCEPT_SUGGESTION_ON_ENTER_OPTIONS = [
  { value: 'on', label: 'On' },
  { value: 'smart', label: 'Smart' },
  { value: 'off', label: 'Off' },
] as const;

export const TAB_COMPLETION_OPTIONS = [
  { value: 'on', label: 'On' },
  { value: 'off', label: 'Off' },
  { value: 'onlySnippets', label: 'Only Snippets' },
] as const;

export const WORD_BASED_SUGGESTIONS_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'currentDocument', label: 'Current Document' },
  { value: 'matchingDocuments', label: 'Matching Documents' },
  { value: 'allDocuments', label: 'All Documents' },
] as const;

export const SHOW_FOLDING_CONTROLS_OPTIONS = [
  { value: 'always', label: 'Always' },
  { value: 'never', label: 'Never' },
  { value: 'mouseover', label: 'On Mouseover' },
] as const;

