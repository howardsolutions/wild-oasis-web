'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { getBookings } from './data-service';
import { supabase } from './supabase';

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account',
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: '/',
  });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updatedData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from('guests')
    .update(updatedData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  // revalidate after update
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  // Only allow the guest to delete his / her own reservation
  const bookings = await getBookings(session.user.guestId);
  const guestBookingIds = bookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are NOT allowed to delete this booking!');
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  // authentication
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  const bookingId = Number(formData.get('bookingId'));

  // Only allow the guest to delete his / her own reservation (authorization)
  const bookings = await getBookings(session.user.guestId);
  const guestBookingIds = bookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are NOT allowed to Update this booking!');
  }

  // build updated data
  const updatedData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  const { error } = await supabase
    .from('bookings')
    .update(updatedData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw new Error('Reservation could not be updated');

  // revalidate
  revalidatePath('/account/reservations');
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // redirecting
  redirect('/account/reservations');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}
