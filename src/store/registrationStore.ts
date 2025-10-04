'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegistrationData {
  name: string;
  birthDate: string;
  email: string;
  password: string;
  agreements: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  profile: {
    nickname: string;
    bio: string;
    profileImage: string | null;
  };
  step: 'register' | 'terms' | 'profile';
}

interface RegistrationStore {
  registrationData: Partial<RegistrationData>;

  // Actions
  updateBasicInfo: (data: {
    name: string;
    birthDate: string;
    email: string;
    password: string;
  }) => void;

  updateAgreements: (agreements: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  }) => void;

  updateProfile: (profile: {
    nickname: string;
    bio: string;
    profileImage: string | null;
  }) => void;

  setStep: (step: RegistrationData['step']) => void;

  clearRegistrationData: () => void;

  getCompleteData: () => RegistrationData | null;
}

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set, get) => ({
      registrationData: {},

      updateBasicInfo: (data) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            ...data,
          }
        })),

      updateAgreements: (agreements) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            agreements,
          }
        })),

      updateProfile: (profile) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            profile,
          }
        })),

      setStep: (step) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            step,
          }
        })),

      clearRegistrationData: () =>
        set({ registrationData: {} }),

      getCompleteData: () => {
        const data = get().registrationData;

        // 모든 필수 데이터가 있는지 확인
        if (
          data.name &&
          data.birthDate &&
          data.email &&
          data.password &&
          data.agreements &&
          data.profile
        ) {
          return data as RegistrationData;
        }

        return null;
      },
    }),
    {
      name: 'registration-storage', // localStorage key
    }
  )
);