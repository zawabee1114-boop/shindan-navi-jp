/**
 * UpgradeCTA.tsx - アップグレード誘導コンポーネント（React Island）
 *
 * インライン表示のコンパクトなアップグレードCTA。
 * 有料機能のゲート前に配置する。
 */

interface UpgradeCTAProps {
  /** 機能名 */
  featureName: string;
  /** 必要なプラン */
  requiredPlan: 'pass' | 'pro';
  /** カスタムメッセージ（省略可） */
  message?: string;
}

export default function UpgradeCTA({
  featureName,
  requiredPlan,
  message,
}: UpgradeCTAProps) {
  const isPass = requiredPlan === 'pass';
  const price = isPass ? '¥390（買い切り）' : '¥590/月';
  const planLabel = isPass ? 'PASS' : 'PRO';
  const href = isPass ? '/pass/' : '/pro/';
  const defaultMessage = `${featureName}は ${planLabel}（${price}）で利用できます。`;

  return (
    <div
      role="region"
      aria-label={`${featureName}のアップグレード案内`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.875rem 1.125rem',
        background: isPass ? '#fffbeb' : '#eef2ff',
        borderRadius: '0.75rem',
        border: `1px solid ${isPass ? '#fde68a' : '#c7d2fe'}`,
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.875rem',
          color: isPass ? '#92400e' : '#3730a3',
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: isPass ? '#f59e0b' : '#4f46e5',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '1px 6px',
            borderRadius: '999px',
            marginRight: '0.375rem',
            verticalAlign: 'middle',
          }}
          aria-hidden="true"
        >
          {planLabel}
        </span>
        {message ?? defaultMessage}
      </p>
      <a
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.5rem 1.125rem',
          background: isPass ? '#f59e0b' : '#4f46e5',
          color: '#fff',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.875rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          minHeight: '36px',
          flexShrink: 0,
          transition: 'opacity 0.15s',
        }}
        aria-label={`${planLabel}の詳細・申込ページへ`}
      >
        {planLabel}の詳細 →
      </a>
    </div>
  );
}
