import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DemoNotice } from '@/components/shared'
import { BrandMark } from '@/components/brand-mark'
export default function Auth({ recovery = false }: { recovery?: boolean }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <div className="auth-layout">
      <section className="auth-story">
        <a href="/" className="auth-brand" aria-label="AFEB · Volver a la web">
          <BrandMark />
        </a>
        <div>
          <span className="eyebrow">El portal de nuestra comunidad</span>
          <h1>
            Conectamos empresas.
            <br />
            Impulsamos
            <br />
            el sector.
          </h1>
          <p>Un lugar para compartir conocimiento, abrir conversaciones y avanzar juntos.</p>
        </div>
        <span>Asociación de Fabricantes de Bricolaje y Ferretería</span>
      </section>
      <section className="auth-form">
        <a href="/" className="auth-mobile-brand" aria-label="AFEB · Volver a la web">
          <BrandMark />
        </a>
        <a className="back-link" href="/">
          <ArrowLeft size={16} />
          Volver a la web
        </a>
        <div>
          <span className="eyebrow">Tu espacio AFEB</span>
          <h2>{recovery ? 'Recupera tu acceso.' : 'Qué bueno verte de nuevo.'}</h2>
          <p>
            {recovery
              ? 'Solicita las instrucciones para restablecer tu contraseña.'
              : 'Accede a tu agenda, tu comunidad y toda la información del sector.'}
          </p>
          {sent ? (
            <div className="summary-box">
              <strong>Vista de confirmación</strong>
              <p>
                Si este email tiene acceso, el portal real enviará instrucciones. Esta demo no envía
                correos.
              </p>
              <Button variant="outline" asChild>
                <Link to="/login">Volver al acceso</Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (recovery) setSent(true)
                else navigate('/portal')
              }}
            >
              <label className="field">
                <span>Email</span>
                <Input type="email" placeholder="tu@empresa.es" required autoComplete="email" />
              </label>
              {!recovery && (
                <label className="field">
                  <span>Contraseña de ejemplo</span>
                  <div className="password-input">
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder="Introduce una contraseña ficticia"
                      required
                      minLength={4}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShow(!show)}
                    >
                      {show ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </label>
              )}
              {!recovery && (
                <Link className="recovery-link" to="/forget-password">
                  ¿Has olvidado tu contraseña?
                </Link>
              )}
              <Button type="submit">
                {recovery ? 'Ver confirmación de recuperación' : 'Abrir demostración'}
                <ArrowRight size={16} />
              </Button>
            </form>
          )}
          <DemoNotice>
            Acceso simulado. Usa datos ficticios: no existe autenticación ni conexión al portal
            actual.
          </DemoNotice>
        </div>
        <span className="form-hint">AFEB · Portal del socio · Prototipo de diseño</span>
      </section>
    </div>
  )
}
