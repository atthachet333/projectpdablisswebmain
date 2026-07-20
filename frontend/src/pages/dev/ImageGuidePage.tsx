import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Image as ImageIcon, CheckCircle2, XCircle } from 'lucide-react';
import { siteImages } from '../../config/images';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

type ImageStatus = 'loading' | 'found' | 'missing';

function ImagePreviewCard({ 
  imgKey, 
  config 
}: { 
  imgKey: string; 
  config: any;
}) {
  const [status, setStatus] = useState<ImageStatus>('loading');

  useEffect(() => {
    const img = new Image();
    img.src = config.src;
    img.onload = () => setStatus('found');
    img.onerror = () => setStatus('missing');
  }, [config.src]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Preview Area */}
      <div className="bg-gray-50 h-48 relative border-b border-gray-100 flex items-center justify-center overflow-hidden p-4">
        {status === 'loading' && <div className="animate-pulse w-8 h-8 rounded-full bg-gray-200" />}
        
        {status === 'found' && (
          <img 
            src={config.src} 
            alt={config.labelTh} 
            className="w-full h-full rounded-md shadow-sm"
            style={{ 
              objectFit: config.fit || 'cover',
              objectPosition: config.position || 'center'
            }} 
          />
        )}

        {status === 'missing' && (
          <div className="flex flex-col items-center text-gray-400">
            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-sm font-medium">ยังไม่มีไฟล์</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {status === 'found' ? (
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3 h-3" /> พบไฟล์
            </div>
          ) : status === 'missing' ? (
            <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
              <XCircle className="w-3 h-3" /> ไม่พบไฟล์
            </div>
          ) : null}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
          {config.labelTh}
        </h3>
        <p className="text-xs font-mono text-[#19B965] break-all bg-green-50 p-1.5 rounded mb-3">
          {config.src}
        </p>

        <div className="space-y-2 text-sm text-gray-600 flex-1">
          <p><span className="font-semibold text-gray-700 w-24 inline-block">ตำแหน่ง:</span> {config.usage || '-'}</p>
          <p><span className="font-semibold text-gray-700 w-24 inline-block">ขนาดแนะนำ:</span> {config.recommendedSize || '-'}</p>
          <p><span className="font-semibold text-gray-700 w-24 inline-block">Object Fit:</span> <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{config.fit || 'cover'}</code></p>
          <p><span className="font-semibold text-gray-700 w-24 inline-block">Position:</span> <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{config.position || 'center'}</code></p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
          <span className="uppercase tracking-wider">{config.page || 'Global'}</span>
          <span className="uppercase tracking-wider">{config.section || 'General'}</span>
        </div>
      </div>
    </div>
  );
}

export default function ImageGuidePage() {
  const { t } = useTranslation();
  const isDev = import.meta.env.DEV;

  if (!isDev) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-6">
        <div>
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">This page is only available in Development mode.</p>
        </div>
      </div>
    );
  }

  // Flatten the images config into categories
  const categories = Object.entries(siteImages).map(([category, images]) => ({
    name: category.toUpperCase(),
    images: Object.entries(images).map(([key, config]) => ({
      key,
      config
    }))
  }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container-custom">
          
          <div className="mb-12 border-b border-gray-200 pb-8">
            <div className="inline-block bg-[#19B965]/10 text-[#064E2B] px-3 py-1 rounded-full text-sm font-bold mb-4 border border-[#19B965]/20">
              DEVELOPMENT ONLY
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Image Placement Guide
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              คู่มือแสดงพิกัดและสถานะของรูปภาพทั้งหมดในระบบ 
              หากรูปภาพใดขึ้นสถานะ "ไม่พบไฟล์" ให้นำไฟล์รูปไปวางตาม Path ที่ระบุไว้
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => (
              <section key={category.name}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">
                    {category.name.charAt(0)}
                  </span>
                  {category.name} IMAGES
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.images.map(({ key, config }) => (
                    <ImagePreviewCard key={key} imgKey={key} config={config} />
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
