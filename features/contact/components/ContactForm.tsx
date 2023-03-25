import { Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

export type ContactFormInputs = {
  name: string
  organization: string
  email: string
  sns: string
  message: string
}

export const textFieldStyle = {
  '& .MuiInputBase-root': { bgcolor: 'white' },
  '& .MuiInputBase-input': {
    // color: '#000000', // 入力文字の色
  },
  '& label': {
    // color: 'skyblue', // 通常時のラベル色
  },
  '& .MuiInput-underline:before': {
    // borderBottomColor: 'skyblue', // 通常時のボーダー色
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'skyblue', // ホバー時のボーダー色
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      // borderColor: 'skyblue', // 通常時のボーダー色(アウトライン)
    },
    '&:hover fieldset': {
      borderColor: 'skyblue', // ホバー時のボーダー色(アウトライン)
    },
    '&.Mui-focused fieldset': {
      borderColor: 'skyblue', // フォーカス時のボーダー色（アウトライン）
    },
  },
  '& label.Mui-focused': {
    color: 'skyblue', // フォーカス時のラベルの色
  },
}

export type ContactFormProps = {}

export const ContactForm: React.FC<ContactFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>()
  const [status, setStatus] = useState<'loading' | 'done' | 'error' | 'none'>(
    'none',
  )

  const onSubmit: SubmitHandler<ContactFormInputs> = useCallback(
    async (data: ContactFormInputs) => {
      setStatus('loading')
      await axios
        .post(`/api/contact`, {
          ...data,
        })
        .then((res) => {
          setStatus('done')
        })
        .catch((error) => {
          setStatus('error')
        })

      console.log(status)
    },
    [],
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'お名前を入力してください。',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="お名前"
                placeholder="山田　太郎"
                required
                error={errors.name !== undefined}
                helperText={errors.name?.message}
                fullWidth
                sx={textFieldStyle}
              />
            )}
          />
          <Controller
            name="organization"
            control={control}
            rules={{}}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="会社 / 組織"
                placeholder="〇〇株式会社"
                error={errors.organization !== undefined}
                helperText={errors.organization?.message}
                fullWidth
                sx={textFieldStyle}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'メールアドレスを入力してください。',
              pattern: {
                value: /^[a-zA-Z0-9_\+\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z0-9]{2,}$/u,
                message: 'メールアドレスの形式が正しくありません。',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                placeholder="example@miravy.com"
                required
                label="メールアドレス"
                error={errors.email !== undefined}
                helperText={errors.email?.message}
                fullWidth
                sx={textFieldStyle}
              />
            )}
          />
          <Controller
            name="sns"
            control={control}
            rules={{}}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                placeholder="https://twitter.com/twitter"
                label="SNS"
                error={errors.sns !== undefined}
                helperText={errors.sns?.message}
                fullWidth
                sx={textFieldStyle}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{
              required: '内容を入力してください。',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="内容"
                required
                error={errors.message !== undefined}
                helperText={errors.message?.message}
                fullWidth
                multiline
                minRows={5}
                maxRows={12}
                sx={textFieldStyle}
              />
            )}
          />
          <div className="text-center">
            <Button
              type={['none', 'error'].includes(status) ? 'submit' : 'button'}
              variant="contained"
              className={classNames(
                'relative rounded-full py-3 pr-16 pl-16 text-center text-lg font-medium hover:opacity-95',
                {
                  'bg-gradient-to-r from-[#86F0D8] to-[#71A6EF]': [
                    'none',
                    'loading',
                    'error',
                  ].includes(status),
                  'before:absolute before:right-[1.2em] before:h-[2px] before:w-[1.5em] before:bg-white after:absolute after:right-[.7em] after:h-[1em] after:w-[1em] after:rounded-full after:border-[2px] after:border-white':
                    ['none', 'error'].includes(status),
                  'bg-green-500 hover:bg-green-400': status === 'done',
                },
              )}
            >
              {(() => {
                switch (status) {
                  case 'none':
                    return '送信する'
                  case 'loading':
                    return (
                      <CircularProgress
                        className="text-lg"
                        size="1.75em"
                        color="inherit"
                      />
                    )
                  case 'done':
                    return '完了'
                  case 'error':
                    return '送信する'
                }
              })()}
            </Button>
            {status === 'error' && (
              <div className="mt-4 font-medium text-red-500">
                エラーが発生しました。
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
