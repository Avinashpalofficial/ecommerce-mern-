import { ShieldCheck, Mail, Phone, Key, Lock } from "lucide-react";

export default function LoginSecurity() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md">
        
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-semibold">Login & Security</h1>
          <p className="text-sm text-gray-500">
            Manage your account security and login settings
          </p>
        </div>

        <SecurityItem
          icon={<ShieldCheck />}
          title="Name"
          value="Avinash Pal"
          action="Edit"
        />

        <SecurityItem
          icon={<Mail />}
          title="Email"
          value="Not added"
          warning
          action="Add"
        />

        <SecurityItem
          icon={<Phone />}
          title="Mobile Number"
          value="+91 80817 92148"
          action="Edit"
        />

        <SecurityItem
          icon={<Key />}
          title="Passkey"
          value="Not set"
          action="Set up"
        />

        <SecurityItem
          icon={<Lock />}
          title="Password"
          value="Not set"
          action="Set up"
        />

        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div>
            <p className="font-medium">Compromised account?</p>
            <p className="text-sm text-gray-500">
              Sign out everywhere and reset credentials
            </p>
          </div>
          <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
            Start
          </button>
        </div>

      </div>
    </div>
  );
}

function SecurityItem({ icon, title, value, action, warning }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex gap-4 items-start">
        <div className="text-gray-600 mt-1">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className={`text-sm ${warning ? "text-yellow-600" : "text-gray-500"}`}>
            {value}
          </p>
        </div>
      </div>
      <button className="px-4 py-1.5 border rounded-lg hover:bg-gray-100">
        {action}
      </button>
    </div>
  );
}
