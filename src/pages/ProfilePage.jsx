import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { storage } from '../config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Mail, Phone, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const defaultAvatar = 'https://i.pinimg.com/736x/87/22/ec/8722ec261ddc86a44e7feb3b46836c10.jpg';
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(currentUser?.photoURL || defaultAvatar);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Sample, replace with API data later
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12045',
      date: '2025-09-10',
      items: ['Paneer Tikka', 'Butter Naan'],
      total: 12.99,
      restaurant: 'Spice Hub'
    },
    {
      id: 'ORD-12012',
      date: '2025-09-06',
      items: ['Chicken Biryani'],
      total: 9.49,
      restaurant: 'Karim\'s'
    }
  ]);
  const [address, setAddress] = useState('123 Main Street, Apt 4B, New Delhi, 110001');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressDraft, setAddressDraft] = useState(address);
  const [prefs, setPrefs] = useState({
    notifications: true,
    promos: false,
    privacyShowName: true
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm_1', type: 'Credit Card', last4: '4242', brand: 'Visa' },
    { id: 'pm_2', type: 'PayPal', email: 'user@example.com' }
  ]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const onSelectPhoto = (e) => {
    const file = e.target.files?.[0];
    setPhotoFile(file || null);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const onSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      let photoURL = currentUser.photoURL || '';
      if (photoFile) {
        const path = `profilePhotos/${currentUser.uid}/${Date.now()}_${photoFile.name}`;
        const ref = storageRef(storage, path);
        await uploadBytes(ref, photoFile);
        photoURL = await getDownloadURL(ref);
      }
      await updateProfile(currentUser, {
        displayName: displayName?.trim() || null,
        photoURL: photoURL || null
      });
      // Refresh local UI immediately
      try { await currentUser.reload(); } catch {}
      setPhotoPreview(currentUser.photoURL || photoURL || defaultAvatar);
      setDisplayName(currentUser.displayName || displayName);
      setMessage('Profile updated');
    } catch (e) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container max-w-6xl mx-auto space-y-8">
        {/* Top: Profile Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex flex-col items-center">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="h-24 w-24 rounded-full object-cover border" />
              ) : (
                <div className="h-24 w-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold">
                  {(displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <label className="mt-3 inline-block">
                <span className="btn btn-outline cursor-pointer">Change Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={onSelectPhoto} />
              </label>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500 mb-1">Username</p>
                <input
                  type="text"
                  value={(currentUser.email || '').split('@')[0]}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{currentUser.email || '—'}</p>
                </div>
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">{currentUser.phoneNumber || '—'}</p>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2 flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                {message && <span className="text-sm text-green-600">{message}</span>}
                {error && <span className="text-sm text-red-600">{error}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Address & Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary-500" /> Delivery Address</h2>
              <button className="btn btn-outline" onClick={() => { setAddressDraft(address); setIsAddressModalOpen(true); }}>Change</button>
            </div>
            <p className="text-gray-800">{address}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary-500" /> Payment Methods</h2>
            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                  <div className="text-gray-800">
                    {pm.type === 'Credit Card' ? `${pm.brand} **** ${pm.last4}` : `PayPal • ${pm.email}`}
                  </div>
                  <button className="text-primary-600 text-sm hover:underline">Manage</button>
                </div>
              ))}
              <button className="btn btn-outline w-full">Add Payment Method</button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No past orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">{o.restaurant}</p>
                    <p className="text-sm text-gray-600">{new Date(o.date).toLocaleDateString()} • {o.items.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <span className="text-gray-900 font-semibold">${o.total.toFixed(2)}</span>
                    <button className="btn btn-outline">Details</button>
                    <button className="btn btn-primary">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings & Logout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Settings className="h-5 w-5 text-primary-500" /> Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-gray-800">Order notifications</span>
                <input type="checkbox" checked={prefs.notifications} onChange={(e) => setPrefs({ ...prefs, notifications: e.target.checked })} />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-gray-800">Promotional messages</span>
                <input type="checkbox" checked={prefs.promos} onChange={(e) => setPrefs({ ...prefs, promos: e.target.checked })} />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-gray-800">Show my name on reviews</span>
                <input type="checkbox" checked={prefs.privacyShowName} onChange={(e) => setPrefs({ ...prefs, privacyShowName: e.target.checked })} />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold whitespace-nowrap overflow-x-auto">Sign out of your account</p>
              <p className="text-sm text-gray-600 whitespace-nowrap overflow-x-auto">You can sign in again anytime.</p>
            </div>
            <div>
              <button className="btn btn-outline flex items-center gap-2 w-full justify-center" onClick={() => logout()}>
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Delivery Address</h3>
            <textarea
              rows={4}
              value={addressDraft}
              onChange={(e) => setAddressDraft(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your full address"
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button className="btn btn-outline" onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => { setAddress(addressDraft.trim() || address); setIsAddressModalOpen(false); }}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;


