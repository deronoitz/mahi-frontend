"use client"

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserData, useUserStore } from '@/store/userStore'

const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Nama minimal 2 karakter')
    .required('Nama wajib diisi'),
  isVegan: Yup.boolean().required('Pilih salah satu'),
  mbti: Yup.string()
    .oneOf(mbtiTypes, 'Pilih MBTI yang valid')
    .required('MBTI wajib dipilih'),
  allergies: Yup.string()
})

interface OnboardingFormProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingForm({ isOpen, onClose }: OnboardingFormProps) {
  const { setUserData, userData } = useUserStore()

  const initialValues: UserData = {
    name: userData?.name || '',
    isVegan: userData?.isVegan || false,
    mbti: userData?.mbti || '',
    allergies: userData?.allergies || ''
  }

  const handleSubmit = (values: UserData) => {
    setUserData(values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white">
            Kenalan Dulu Yuk! 👋
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Ceritain tentang kamu biar aku bisa kasih rekomendasi makanan yang pas
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isValid }) => (
            <Form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Nama *
                </label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Masukkan nama kamu"
                  className="w-full"
                />
                <ErrorMessage 
                  name="name" 
                  component="div" 
                  className="text-red-400 text-xs mt-1" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-white mb-3">
                  Apakah kamu vegan? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Field
                      type="radio"
                      name="isVegan"
                      value="true"
                      checked={values.isVegan === true}
                      onChange={() => setFieldValue('isVegan', true)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-primary-300"
                    />
                    <span className="text-white">Ya, saya vegan</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Field
                      type="radio"
                      name="isVegan"
                      value="false"
                      checked={values.isVegan === false}
                      onChange={() => setFieldValue('isVegan', false)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-primary-300"
                    />
                    <span className="text-white">Tidak</span>
                  </label>
                </div>
                <ErrorMessage 
                  name="isVegan" 
                  component="div" 
                  className="text-red-400 text-xs mt-1" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="mbti" className="block text-sm font-medium text-white mb-2">
                  MBTI *
                </label>
                <Select
                  value={values.mbti}
                  onValueChange={(value) => setFieldValue('mbti', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tipe MBTI kamu" />
                  </SelectTrigger>
                  <SelectContent>
                    {mbtiTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage 
                  name="mbti" 
                  component="div" 
                  className="text-red-400 text-xs mt-1" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="allergies" className="block text-sm font-medium text-white mb-2">
                  Alergi (opsional)
                </label>
                <Field
                  as={Input}
                  id="allergies"
                  name="allergies"
                  placeholder="Contoh: kacang, seafood, susu"
                  className="w-full"
                />
                <ErrorMessage 
                  name="allergies" 
                  component="div" 
                  className="text-red-400 text-xs mt-1" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid || !values.name || !values.mbti}
                >
                  Mulai Petualangan Kuliner! 🍽️
                </Button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
