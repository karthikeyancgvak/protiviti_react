export function AssetImage({ src, alt, missing, onMissing, placeholder = 'Image placeholder' }) {
  if (missing) {
    return <div className="asset-placeholder">{placeholder}</div>
  }

  return <img src={src} alt={alt} onError={onMissing} />
}

